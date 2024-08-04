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
      <div>
        <label class="text-head">Mật Khẩu</label>
        <input v-model="password" type="password" id="password" class="fadeIn third" name="password">
      </div>
      <!-- Begin Noti Fail -->
      <div v-if="divReportDisplayNone"
        class="div-report position-relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="60" viewBox="0 0 266 60" fill="none"
          style="position: absolute; left: -42px; top: -10px;">
          <g filter="url(#filter0_d_101_1018)">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M26.8685 15.6436L33.7633 8.64355L39.8921 15.6436H245C248.314 15.6436 251 18.3298 251 21.6436V36.6428C251 39.9565 248.314 42.6428 245 42.6428H17C13.6863 42.6428 11 39.9565 11 36.6428V21.6436C11 18.3299 13.6863 15.6436 17 15.6436H26.8685Z"
              fill="white" />
            <path
              d="M33.7633 8.64355L34.1395 8.31419C34.0479 8.2096 33.917 8.14785 33.778 8.14377C33.639 8.13969 33.5047 8.19365 33.4071 8.29269L33.7633 8.64355ZM26.8685 15.6436V16.1436C27.0024 16.1436 27.1307 16.0898 27.2247 15.9944L26.8685 15.6436ZM39.8921 15.6436L39.5159 15.9729C39.6109 16.0814 39.748 16.1436 39.8921 16.1436V15.6436ZM33.4071 8.29269L26.5122 15.2927L27.2247 15.9944L34.1196 8.99442L33.4071 8.29269ZM40.2683 15.3142L34.1395 8.31419L33.3871 8.97292L39.5159 15.9729L40.2683 15.3142ZM39.8921 16.1436H245V15.1436H39.8921V16.1436ZM245 16.1436C248.038 16.1436 250.5 18.606 250.5 21.6436H251.5C251.5 18.0537 248.59 15.1436 245 15.1436V16.1436ZM250.5 21.6436V36.6428H251.5V21.6436H250.5ZM250.5 36.6428C250.5 39.6803 248.038 42.1428 245 42.1428V43.1428C248.59 43.1428 251.5 40.2326 251.5 36.6428H250.5ZM245 42.1428H17V43.1428H245V42.1428ZM17 42.1428C13.9624 42.1428 11.5 39.6803 11.5 36.6428H10.5C10.5 40.2326 13.4101 43.1428 17 43.1428V42.1428ZM11.5 36.6428V21.6436H10.5V36.6428H11.5ZM11.5 21.6436C11.5 18.606 13.9624 16.1436 17 16.1436V15.1436C13.4101 15.1436 10.5 18.0537 10.5 21.6436H11.5ZM17 16.1436H26.8685V15.1436H17V16.1436Z"
              fill="#FB2121" />
          </g>
          <defs>
            <filter id="filter0_d_101_1018" x="0.5" y="0.143555" width="300" height="58.999"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha" />
              <feOffset dx="2" dy="4" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_101_1018" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_101_1018" result="shape" />
            </filter>
          </defs>
          <text x="22" y="35" fill="red" class="text-svg">{{ textReport }}</text>
        </svg>
      </div>
      <!-- End Noti Fail -->
      <div @click.prevent="submitLogin">
        <input type="submit" class="fadeIn fourth" value="Đăng nhập">
      </div>
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
      <a @click.prevent="routerPush('ResetPassword')" class="underlineHover" href="">Reset Password</a>
    </div>

  </div>
</div>
</template>

<script setup>
import $ from 'jquery'
import { inject, ref } from 'vue';
import service from "../services/service"
import { userStore } from "../store/modules/userStore"
import { useRouter } from 'vue-router'

const Constant = inject("$constant")
const UserStore = userStore()
const router = useRouter()
const isLoading = inject('isLoading')

const user_name = ref('')
const password = ref('')
const divReportDisplayNone = ref(false)
const textReport = ref('')

const routerPush = (name, params = {}) => {
  router.push({
    name,
    params
  })
}

const submitLogin = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  divReportDisplayNone.value = false
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathLogin;
  let params = {
    user_name: user_name.value,
    password: password.value
  }
  isLoading.value = true
  const response = await service.post(url, params);
  isLoading.value = false
  if (response.status == 200) {
    const expirationTime = new Date().getTime() + response.data.data.expires_in * 1000;
    const tokenToStore = {
      token: response.data.data.access_token,
      expirationTime: expirationTime
    };
    localStorage.setItem('token', JSON.stringify(tokenToStore))
    localStorage.setItem('is_admin', response.data.data.user.is_admin)
    UserStore.user = {
      id: response.data.data.user.id,
      position: response.data.data.user.position,
      first_name: response.data.data.user.first_name,
      last_name: response.data.data.user.last_name,
      url_avatar: response.data.data.user.url_avatar,
      is_admin: response.data.data.user.is_admin,
    }
    getAllUserInfo()
    routerPush('Home')
    document.title = 'Quản lý công việc';
  } else if (response.status == 401) {
    divReportDisplayNone.value = true
    textReport.value = "Sai tên đăng nhập hoặc mật khẩu!"
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('input[id=' + key + ']').parent().append('<p class="error text-head" style="color: red; text-align: left; font-size: 12px;padding-left:33px">' + value + '</p>');
      $('input[id=' + key + ']').addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const getAllUserInfo = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetAllUser;
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  const response = await service.get(url, {}, headers);
  UserStore.allUser = response.data.data
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
    display:inline-block;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 12px; /* 100% */
    text-decoration-line: underline;
}

h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display:inline-block;
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
    -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
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

input[type=button], input[type=submit], input[type=reset]  {
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
    -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    -webkit-border-radius: 6px 6px 6px 6px;
    border-radius: 6px 6px 6px 6px;
    margin: 40px 20px 30px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
    background-color: #39ace7;
    cursor: pointer;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
}

input[type=text], input[type=password] {
    border: #CCCCCC;
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

input[type=text]:focus,
input[type=password]:focus {
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
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
    opacity:0;
    -webkit-animation:fadeIn ease-in 1;
    -moz-animation:fadeIn ease-in 1;
    animation:fadeIn ease-in 1;

    -webkit-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    animation-fill-mode:forwards;

    -webkit-animation-duration:1s;
    -moz-animation-duration:1s;
    animation-duration:1s;
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
.text-svg{
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
}
.bg-set-reset {
    background: #00B2EE !important;
}
.error {
  
}
</style>