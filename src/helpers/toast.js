import Swal from 'sweetalert2/dist/sweetalert2.js'

const toastMixin = (clickHandler, additionalData1, additionalData2) => {
    return Swal.mixin({
      toast: true,
      position: 'top',
      width: '550px',
      showConfirmButton: false,
      timer: 5000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
  
        // Thêm sự kiện click cho toast khi nó được hiển thị
        toast.addEventListener('click', () => {
          // Gọi hàm xử lý được truyền vào
          if (clickHandler && typeof clickHandler === 'function') {
            clickHandler(additionalData1, additionalData2);
          }
        });
      }
    });
  };
  
  export default toastMixin;