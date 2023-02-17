"use strict";
import { ApiPromise, WsProvider } from '@polkadot/api'
const { Keyring } = require('@polkadot/keyring');
const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

contact_book_email_account = {
    "doxyworx.test.bob@gmail.com": ["//Alice"],
    "doxyworx.test.bob@gmail.com": ["//Bob"],
    "doxyworx.test.bob@gmail.com": ["//Dave"],
}

function get_email_account(account_email) {
    return contact_book_email_account[account_email][0];
}

var api = null;

var req_ = (new URL(document.location)).searchParams;
req_ = req_.get("req");
req_ = decodeURIComponent(req_);
const req = JSON.parse(req_);

async function main () {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('ws://127.0.0.1:9944');

  // Create the API and wait until ready
  api = await ApiPromise.create({ provider });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

  // Retrieve the initial balance. Since the call has no callback, it is simply a promise
  // that resolves to the current on-chain value
  let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(Alice);

  console.log(`${Alice} has a balance of ${previousFree}, nonce ${previousNonce}`);
  console.log(`You may leave this example running and start example 06 or transfer any value to ${Alice}`);

//   // Here we subscribe to any balance changes and update the on-screen value
//   api.query.system.account(Alice, ({ data: { free: currentFree }, nonce: currentNonce }) => {
//     // Calculate the delta
//     const change = currentFree.sub(previousFree);

//     // Only display positive value changes (Since we are pulling `previous` above already,
//     // the initial balance change will also be zero)
//     if (!change.isZero()) {
//       console.log(`New balance change of ${change}, nonce ${currentNonce}`);

//       previousFree = currentFree;
//       previousNonce = currentNonce;
//       // TODO HERE
      
//     }
//   });

  api.query.system.events((events) => {
    console.log(`\nReceived ${events.length} events:`);

    // Loop through the Vec<EventRecord>
    events.forEach((event) => {
        try {
            let deprocess = event.event.data.deprocess.words[0];
            let src = String.fromCharCode.apply(null, event.event.data.src);
            let dst = String.fromCharCode.apply(null, event.event.data.dst);

            on_step(deprocess, src, dst);

        } catch (ex) {
            console.warn(ex);
        }
    });
  });

}

function uploadFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      openDiagram(contents);
    };
    reader.readAsText(file);
}

function upload() {
    let inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept =".bpmn, .xml";
    inputFile.onchange = uploadFile;
    inputFile.click();
}

// const EMPTY_BPMN = 
// `<?xml version="1.0" encoding="UTF-8"?>
// <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_0sw2gw1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.3.1">
//   <bpmn:process id="Process_01zbi84" />
//   <bpmndi:BPMNDiagram id="BPMNDiagram_1">
//     <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_01zbi84" />
//   </bpmndi:BPMNDiagram>
// </bpmn:definitions>
// `;

const EMPTY_BPMN = 
`<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.3.5">
  <bpmn:process id="Process_1" isExecutable="true">
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

var bpmnModeler = new BpmnJS({
    container: '#canvas',
    keyboard: {
        bindTo: window
    }
});

function step(deprocess, action, account) {

    const keyring = new Keyring({ type: 'sr25519' });
    const step_account = keyring.addFromUri('//' + account);

    api.tx.nextStep.step(deprocess, action, "action_data")
    .signAndSend(step_account, function(status, events, dispatchError ) {
        if (dispatchError) {
            if (dispatchError.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = api.registry.findMetaError(dispatchError.asModule);
                const { docs, name, section } = decoded;
        
                console.log(`${section}.${name}: ${docs.join(' ')}`);
            } else {
                // Other, CannotLookup, BadOrigin, no extra info
                console.log(dispatchError.toString());
            }
        }
    });
};

let on_click = (ev) => {
    if(!ev.originalEvent.shiftKey)
        return;

    let action = ev.element.businessObject.name;
    let inp = prompt("Do Action using Account: ").split(',');
    let account = inp[0];
    let action_data = inp.length > 1 ? parseInt(inp["1"]) : 0;
    step(recent_deprocess, action, account, action_data);
}

var eventBus = bpmnModeler.get('eventBus');
eventBus.on('element.click', on_click);


var ids_names = {};
var names_ids = {};

function load_ids_names() {
    let elementRegistry = bpmnModeler.get('elementRegistry');

    ids_names = {};
    names_ids = {};

    for( var obj of elementRegistry.getAll()) {
        try {
            let id = obj.id;
            let typ = obj.type;
            let name = typ.endsWith("StartEvent") ? "START" :
                typ.endsWith("EndEvent") ? "END" :
                obj.businessObject.name;
            ids_names[id] = name;
            names_ids[name] = id;        
        } catch (ex) {
            console.warn(ex);
        }

    }
}


function download() {
    bpmnModeler.saveXML({ format: true }, function (err, bpmn) {
        if (err) {
            return console.error('could not save BPMN 2.0 diagram', err);
        }

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(bpmn));
        element.setAttribute('download', "DeProcessModel.bpmn");
      
        element.style.display = 'none';
        // document.body.appendChild(element);
      
        element.click();
      
        // document.body.removeChild(element);
    });
}
/**
 * Open diagram in our modeler instance.
 *
 * @param {String} bpmnXML diagram to display
 */
 
function openDiagram(bpmnXML, cb) {
    // import diagram
    bpmnModeler.importXML(bpmnXML, function (err) {
        if (err) {
            return console.error('could not import BPMN 2.0 diagram', err);
        }
        // access modeler components
        var canvas = bpmnModeler.get('canvas');
        // var overlays = bpmnModeler.get('overlays');
        // zoom to fit full viewport
        canvas.zoom('fit-viewport');

        load_ids_names();

        // attach an overlay to a node
        // overlays.add('SCAN_OK', 'note', {
        //     position: {
        //         bottom: 0,
        //         right: 0
        //     },
        //     html: '<div class="diagram-note">Mixed up the labels?</div>'
        // });
        // add marker
        // canvas.addMarker('SCAN_OK', 'needs-discussion');

        if(cb) {
            cb();
        }
    });
}

function start() {
    bpmnModeler.saveXML({ format: true }, function (err, bpmn) {
        if (err) {
            return console.error('could not save BPMN 2.0 diagram', err);
        }

        openDiagram(bpmn);

        const keyring = new Keyring({ type: 'sr25519' });
        const alice = keyring.addFromUri('//Alice');

        // const DOC_ID = req["doc"];
        const DOC_ID = 0;

        api.tx.nextStep.start(bpmn, DOC_ID)
        .signAndSend(alice, function(status, events, dispatchError ) {
            // status would still be set, but in the case of error we can shortcut
            // to just check it (so an error would indicate InBlock or Finalized)
            if (dispatchError) {
              if (dispatchError.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = api.registry.findMetaError(dispatchError.asModule);
                const { docs, name, section } = decoded;
        
                console.log(`${section}.${name}: ${docs.join(' ')}`);
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                console.log(dispatchError.toString());
              }
            }
          });
    });
}

var recent_deprocess = 0;
var deprocess_done = {};
var deprocess_current = {};

function mark_done(deprocess, src, dst) {

    if (!(deprocess in deprocess_done)) {
        deprocess_done[deprocess] = [];
    }
    deprocess_done[deprocess].push(src);

    let modeling = bpmnModeler.get('modeling');
    let elementRegistry = bpmnModeler.get('elementRegistry');

    //clear
    let elements_all = Object.keys(ids_names).map(name => elementRegistry.get(name  ) );
    modeling.setColor(elements_all, null);

    let elements = deprocess_done[deprocess].map(name => elementRegistry.get(names_ids[name]) );
    modeling.setColor(elements, {
        // stroke: '#00ff00',
        fill: '#00ff00'
    });

}

function mark_current(deprocess, src, dst) {
    deprocess_current[deprocess] = dst;

    let modeling = bpmnModeler.get('modeling');
    let elementRegistry = bpmnModeler.get('elementRegistry');

    //clear
    // let elements_all = [];
    // modeling.setColor(elements_all, null);

    let dst_id = names_ids[dst];
    let elements = [ elementRegistry.get(dst_id) ];
    modeling.setColor(elements, {
        // stroke: '#ffff00',
        fill: '#ffff00'
    });

}

function on_step(deprocess, src, dst) {
    console.log(deprocess, src, dst);
    if(deprocess > recent_deprocess) {
        recent_deprocess = deprocess;
        $('#deprocess').text(deprocess);
    }
    mark_done(deprocess, src, dst);
    mark_current(deprocess, src, dst);
}

$('#downloadButton').click(download);
$('#startButton').click(start);
$('#uploadButton').click(upload);
$('#uploadButton').on('change', upload);

function addTasksToDiagram(fields, roles) {
    var x = 30;
    var y = 20;
    var w = 600;
    var h = 200;

    var canvas = bpmnModeler.get('canvas');
    var elementFactory = bpmnModeler.get('elementFactory');
    var elementRegistry = bpmnModeler.get('elementRegistry');
    var modeling = bpmnModeler.get('modeling');
    var autoPlace = bpmnModeler.get('autoPlace');
    // var root = canvas.getRootElement();

    canvas.zoom("fit-viewport");

    // var task = elementFactory.createBpmnElement("shape", {
    //     type: "bpmn:Task",
    //     x: 350,
    //     y: 100
    // });
    

    var participants = {}
    
    var roleNames = Object.keys(roles);
    var roleName0 = roleNames[0];

    var process = elementRegistry.get("Process_1");
    // startEvent = elementRegistry.get("StartEvent_1");

    var participant = elementFactory.createParticipantShape({
      type: "bpmn:Participant"
    });
    participant.businessObject.name = roleName0;
    participants[roleName0] = participant;

    modeling.createShape(participant, { x: x, y: y }, process);

    // return;

    // var participant2 = elementFactory.createParticipantShape({
    //     type: "bpmn:Participant"
    //   });
    //   modeling.createShape(participant2, { x: 400, y: 100 }, process);

    const collaboration = elementRegistry.filter( e => "bpmn:Collaboration" == e.type)[0];

    var i = 1;
    for(var i = 1; i < roleNames.length; ++i) {
        var roleName = roleNames[i];
        var participant = elementFactory.createParticipantShape({type: "bpmn:Participant"});
        participant.businessObject.name = roleName;
        modeling.createShape(participant, { x: 400, y: y + i * ( y + h) }, collaboration);
        participants[roleName] = participant;
        // modeling.createShape(participant, { x: 400, y: y + i * ( y + h) }, collaboration);
    }

    for(const [i, row] of Object.entries(field)) {
        for(const [j, field] of Object.entries(row)) {
            var participant = participants[field[0]];
            const task = i + j;

            var taskShape = elementFactory.createBpmnElement("shape", {
                type: "bpmn:Task",
                x: participant.x + 150,
                y: participant.y + 50
            });
            taskShape.businessObject.name = task;
            canvas.addShape(taskShape, participant);
    
        }
    }

    return;

    for(const[task, role] of Object.entries(tasks)) {
        var participant = participants[role];
        // var taskShape = elementFactory.createShape({type: "bpmn:Task"})
        // // modeling.createShape(participant2, { x: 400, y: y + i * ( y + h) }, collaboration);
        // autoPlace.append(task, participant);
        // taskShape.businessObject.name = task;
            
        a = b;

        var taskShape = elementFactory.createBpmnElement("shape", {
            type: "bpmn:Task",
            x: 10,
            y: 10
        });
        taskShape.businessObject.name = task;
        canvas.addShape(taskShape, participant);
        // autoPlace.append(task, participant);

    }

    // const participant2 = elementFactory.createParticipantShape({type: "bpmn:Participant"});
    // modeling.createShape(participant2, { x: 400, y: 500 }, collaboration);
  

}

function loadDoc() {
    var tasks = {};
    console.log(req);
    addTasksToDiagram(req['fields'], req['roles']);
    // addTaksToDiagram(req['tasks']);
    // assignRoles(req['roles']);
}

main().catch(console.error);

function get_doc_deprocess(doc) {
    var deprocess = api.query.nextStep.deprocessCount();

    //TODO, loop see which deprocess has doc id on its start step data
    return deprocess;
}

function on_step_cmd() {
    var doc = req["doc"];
    var deprocess = get_doc_deprocess(doc);

    var action = api.query.nextStep.deProcessCurrent(u128);
    var account_email = req["account_email"];
    var account = get_email_account(account_email);



    var action = req["action"];

    step(deprocess, action, account);
}
const CMD = req["cmd"];
if("step" == CMD) {
    on_step_cmd();
} else if("start" == CMD) {
    openDiagram(EMPTY_BPMN, loadDoc);
}
