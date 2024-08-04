
JavaScript
<template>
  <div>
    <h1>SweetAlert2 Dialog Box Examples</h1>
    <button @click="handleAlertClick">Alert Dialog</button>
    <button @click="handleConfirmClick">Confirm Dialog</button>
    <button @click="handlePromptClick">Prompt Dialog</button>
    <button @click="handleSuccessClick">Success Dialog</button>
    <button @click="handleErrorClick">Error Dialog</button>
    <button @click="handleWarningClick">Warning Dialog</button>
    <button @click="handleInfoClick">Info Dialog</button>
    <button @click="handleQuestionClick">Question Dialog</button>
  </div>
</template>
 
<script>
import Swal from 'sweetalert2';

export default {
  name: 'SweetAlert2Demo',
  methods: {
    handleAlertClick() {
      Swal.fire('This is an alert dialog box!');
    },
    handleConfirmClick() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your file is safe :)', 'error');
        }
      });
    },
    handlePromptClick() {
      Swal.fire({
        title: 'Enter your name',
        input: 'text',
        inputLabel: 'Name',
        inputPlaceholder: 'Enter your name',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to enter a name!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(`Hello ${result.value}!`);
        }
      });
    },
    handleSuccessClick() {
      Swal.fire('Success!', 'Your action has been completed.', 'success');
    },
    handleErrorClick() {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    },
    handleWarningClick() {
      Swal.fire('Warning!', 'Please be careful.', 'warning');
    },
    handleInfoClick() {
      Swal.fire('Info!', 'This is an informative message.', 'info');
    },
    handleQuestionClick() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to continue?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Confirmed!', 'You have clicked Yes.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'You have clicked No.', 'error');
        }
      });
    }
  }
};
</script>