// ✅ API Gateway base URL (STAGE only)
const API_BASE_URL =
  "YOUR_API_GATEWAY_URL";

/* =========================
   HELPER: GET FORM DATA
========================= */
function getFormData() {
  return {
    patientId: $("#patient_id").val(),
    fullName: $("#full_name").val(),
    age: $("#age").val(),
    gender: $("#gender").val(),
    contactNo: $("#contact_no").val(),
    department: $("#department").val(),
    doctorAssigned: $("#doctor_assigned").val(),
    visitDate: $("#date").val()
  };
}

/* =========================
   SAVE / UPDATE PATIENT
========================= */
$("#savepatient, #updatepatient").click(function () {
  const data = getFormData();
  const isUpdate = this.id === "updatepatient";

  if (!data.patientId || !data.fullName) {
    alert("Patient ID and Full Name are required");
    return;
  }

  $.ajax({
    url: API_BASE_URL + "/patient",
    type: isUpdate ? "PUT" : "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function () {
      alert(isUpdate ? "Patient updated successfully" : "Patient saved successfully");
      resetForm();
      loadPatients();
    },
    error: function (err) {
      alert("Error saving patient");
      console.error(err);
    }
  });
});

/* =========================
   GET ALL PATIENTS
========================= */
$("#getpatients").click(loadPatients);

function loadPatients() {
  $.ajax({
    url: API_BASE_URL + "/patient",
    type: "GET",
    success: function (data) {
      const tbody = $("#PatientTable tbody").empty();
      data.forEach(p => {
        tbody.append(`
          <tr>
            <td>${p.patientId}</td>
            <td>${p.fullName}</td>
            <td>${p.age}</td>
            <td>${p.gender}</td>
            <td>${p.contactNo}</td>
            <td>${p.department}</td>
            <td>${p.doctorAssigned}</td>
            <td>${p.visitDate}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-primary"
                onclick="editPatient('${p.patientId}')">Edit</button>
            </td>
          </tr>
        `);
      });
    },
    error: function () {
      alert("Failed to load patients");
    }
  });
}

/* =========================
   EDIT PATIENT
========================= */
function editPatient(patientId) {
  $.ajax({
    url: API_BASE_URL + "/patient/" + patientId,
    type: "GET",
    success: function (p) {
      $("#patient_id").val(p.patientId).prop("disabled", true);
      $("#full_name").val(p.fullName);
      $("#age").val(p.age);
      $("#gender").val(p.gender);
      $("#contact_no").val(p.contactNo);
      $("#department").val(p.department);
      $("#doctor_assigned").val(p.doctorAssigned);
      $("#date").val(p.visitDate);

      $("#savepatient").addClass("d-none");
      $("#updatepatient").removeClass("d-none");
    },
    error: function () {
      alert("Patient not found");
    }
  });
}

/* =========================
   SEARCH BY PATIENT ID
========================= */
$("#searchBtn").click(function () {
  const patientId = $("#searchBox").val().trim();
  if (!patientId) return;

  $.ajax({
    url: API_BASE_URL + "/patient/" + patientId,
    type: "GET",
    success: function (p) {
      const tbody = $("#PatientTable tbody").empty();
      tbody.append(`
        <tr>
          <td>${p.patientId}</td>
          <td>${p.fullName}</td>
          <td>${p.age}</td>
          <td>${p.gender}</td>
          <td>${p.contactNo}</td>
          <td>${p.department}</td>
          <td>${p.doctorAssigned}</td>
          <td>${p.visitDate}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-primary"
              onclick="editPatient('${p.patientId}')">Edit</button>
          </td>
        </tr>
      `);
    },
    error: function () {
      alert("Patient not found");
    }
  });
});

/* =========================
   RESET FORM
========================= */
$("#resetform").click(resetForm);

function resetForm() {
  $("input, select").val("");
  $("#patient_id").prop("disabled", false);
  $("#savepatient").removeClass("d-none");
  $("#updatepatient").addClass("d-none");
}
