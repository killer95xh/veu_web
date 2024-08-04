<template>
  <div class="wrapper fadeInDown">
    <!-- Icon -->
    <div class="fadeIn first icon_custom">
    <img src="@/assets/images/logo.png" id="icon" alt="User Icon" />
    </div>

    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Login Form -->
      <form>
        <div>
          <label class="text-head mt-4">Tên Đăng Nhập</label>
          <input v-model="user_name" type="text" id="user_name" class="fadeIn second" name="user_name">
        </div>

        <input @click.prevent="submitResetPassword()" type="submit" class="fadeIn fourth bg-set-reset" value="Cập Nhật Password"
          style="margin: 20px 20px 30px 20px;" data-toggle="modal">
      </form>

    </div>
    <!-- Remind Passowrd -->
    <div id="formFooter" class="mt-5">
      <a @click.prevent="routerPush('Login')" class="underlineHover" href="">Quay về màn hình Login</a>
    </div>
  </div>
      <!-- Modal -->
      <div class="modal fade" id="modal-reset-password-success" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="text-one">
                      Mật khẩu của bạn đã được hệ thống gửi về email đã đăng ký cùng với tài khoản. Vui lòng check hộp thư đến trong email đó.
                    </div>
                    <div class="text-two">
                      ※Trong trường hợp mật khẩu không được gửi đến vui lòng liên hệ quản trị viên để được hỗ trợ.
                    </div>
                    <div class="text-end text-center"><a @click.prevent="routerPush('Login')" class="underlineHover" href="">Quay về màn hình Login</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import $ from 'jquery'
import { useRouter } from 'vue-router'
import { inject, ref } from 'vue'
import service from "../services/service"

const Constant = inject("$constant")
const router = useRouter()
const isLoading = inject('isLoading')

const user_name = ref('')
const email = ref('')

const submitResetPassword = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathResetPassword;
  let params = {
    user_name: user_name.value,
    email: email.value
  }
  isLoading.value = true
  const response = await service.post(url, params);
  isLoading.value = false
  if (response.status == 200) {
    $("#modal-reset-password-success").modal('show');
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('input[id=' + key + ']').parent().append('<p class="error text-head" style="color: red; text-align: left; font-size: 12px;padding-left:33px">' + value + '</p>');
      $('input[id=' + key + ']').addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const routerPush = (name, params = {}) => {
  $("#modal-reset-password-success").modal('hide');
  router.push({
    name,
    params
  })
}
</script>

<style scoped>
/* BASIC */

html {
  background-color: #56baed;
}

body {
  height: 100vh;
  font-family: NotoSansJP-Regular;
}

a {
  color: #00A5DC;
  display: inline-block;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
  /* 100% */
  text-decoration-line: underline;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}



/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
}

#formContent {
  margin-top: 41px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  padding: 0px 25px 30px 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button],
input[type=submit],
input[type=reset] {
  width: 85%;
  height: 40px;
  background: linear-gradient(90deg, #00B2EE 78.14%, #3FDAAB 100%);
  border: #CCCCCC;
  color: #FFFFFF;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: NotoSansJP-Regular;
  font-size: 16px;
  font-weight: 700;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 6px 6px 6px 6px;
  border-radius: 6px 6px 6px 6px;
  margin: 40px 20px 30px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover,
input[type=submit]:hover,
input[type=reset]:hover {
  background-color: #39ace7;
  cursor: pointer;
}

input[type=button]:active,
input[type=submit]:active,
input[type=reset]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text],
input[type=password] {
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  height: 40px;
  border: 1px solid #CCCCCC;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}



/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 250px;
  height: 96.354px;
}

.text-head {
  float: left;
  margin: 10px 0 5px 35px;
  color: #3B3B3B;
  font-size: 12px;
  line-height: 12px;
}

.text-svg {
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
}

.bg-set-reset {
  background: #00B2EE !important;
}
.text-one {
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #3B3B3B;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px; /* 113.333% */
  margin: 25px;
}
.text-two {
  margin: 25px;
  color: #3B3B3B;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 138.462% */
}
.text-end {
  margin: 25px;
}
</style>