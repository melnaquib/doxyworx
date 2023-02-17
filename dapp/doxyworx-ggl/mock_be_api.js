const _mock_be_api_tmpls = { 
	"1_bKRgqCmL4tH-0g27b1sgCp_gPcU7JY3cZN8MEKKqPE": {
		"bms": {
			"patient_name": "kix.x4secjyrkiz9",
			"accession_no": "kix.3i6lpwnj13hx",
			"exam_date": "kix.6hj6ucf9fc3j",
			"patient_mrn": "kix.vkxwpq2rqxmv",
			"patient_dob": "kix.8k4q8li4t0rg",
			"requesting_physician":"kix.1ula8ux4x792",
			"exam_code": "kix.rjinrbb7wbw5",
			"exam": "kix.9wtmou83w708",
		},
		"bm_body": "kix.1kq2tpz32x5z"
	}
};

_mock_be_api_doc_studies = {
  "0": "5",
  "1": "5",
  "2": "5"
}

const _mock_be_api_study_infos = {
	"5": {
			"patient_name": "John Smith",
			"accession_no": "1001001",
			"exam_date": "1/1/2021",
			"patient_mrn": "2001001",
			"patient_dob": "1/1/2000",
			"requesting_physician":"Dr Jane Michael",
			"exam_code": "3001001",
			"exam": "Spine CT",
		},
}

function _mock_be_bm_fields(atmpl_id){
  return _mock_be_api_tmpls[atmpl_id]["bms"];
}

function _mock_be_api_getStudyInfo() {

  return _mock_be_api_study_infos[stiuid];
}
