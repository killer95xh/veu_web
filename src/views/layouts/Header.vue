<template>
  <!-- Begin Header -->
  <header class="header header-sticky mb-3">
    <div class="container-fluid">
      <!-- Logo header -->
      <div id="logo_admin_header" class="logo_admin logo_admin_header display-none">
        <img src="@/assets/images/logo.png" alt="" class="max-width">
      </div>
      <!-- End Logo Header -->

      <button class="header-toggler px-md-0 me-md-3" v-class="{active: isActive}" type="button" @click="toggleSidebar()">

        <svg id="icon-header-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M22.8 5.99609H9.2C8.35131 5.99609 7.53737 6.33323 6.93726 6.93335C6.33714 7.53347 6 8.3474 6 9.19609V22.7961C6 23.6448 6.33714 24.4587 6.93726 25.0588C7.53737 25.659 8.35131 25.9961 9.2 25.9961H22.8C23.6487 25.9961 24.4626 25.659 25.0627 25.0588C25.6628 24.4587 26 23.6448 26 22.7961V9.19609C26 8.3474 25.6628 7.53347 25.0627 6.93335C24.4626 6.33323 23.6487 5.99609 22.8 5.99609ZM23.8 22.5321C23.8 22.8673 23.6668 23.1888 23.4298 23.4259C23.1927 23.6629 22.8712 23.7961 22.536 23.7961H9.46399C9.12908 23.795 8.80818 23.6615 8.57136 23.4247C8.33454 23.1879 8.20105 22.867 8.2 22.5321V9.4601C8.20105 9.12519 8.33454 8.80429 8.57136 8.56747C8.80818 8.33066 9.12908 8.19715 9.46399 8.19609H22.536C22.8712 8.19609 23.1927 8.32926 23.4298 8.56631C23.6668 8.80335 23.8 9.12486 23.8 9.4601V22.5321Z"
            fill="#3B3B3B" />
          <path
            d="M18.3522 22.6485C18.0341 22.6482 17.7291 22.5216 17.5042 22.2965L12.0042 16.7965C11.7795 16.5715 11.6533 16.2665 11.6533 15.9485C11.6533 15.6305 11.7795 15.3255 12.0042 15.1005L17.3963 9.70446C17.6213 9.47974 17.9263 9.35352 18.2443 9.35352C18.5623 9.35352 18.8673 9.47974 19.0923 9.70446C19.2041 9.81595 19.2929 9.94841 19.3535 10.0943C19.414 10.2401 19.4452 10.3965 19.4452 10.5545C19.4452 10.7124 19.414 10.8688 19.3535 11.0146C19.2929 11.1605 19.2041 11.293 19.0923 11.4045L14.5643 15.9485L19.2163 20.6005C19.441 20.8255 19.5672 21.1305 19.5672 21.4485C19.5672 21.7665 19.441 22.0715 19.2163 22.2965C19.103 22.4098 18.9683 22.4994 18.8199 22.5599C18.6715 22.6203 18.5125 22.6504 18.3522 22.6485Z"
            fill="#3B3B3B" />
        </svg>

        <svg id="icon-header-2" class="display-none" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M22.8 5.99609H9.2C8.35131 5.99609 7.53737 6.33323 6.93726 6.93335C6.33714 7.53347 6 8.3474 6 9.19609V22.7961C6 23.6448 6.33714 24.4587 6.93726 25.0588C7.53737 25.659 8.35131 25.9961 9.2 25.9961H22.8C23.6487 25.9961 24.4626 25.659 25.0627 25.0588C25.6628 24.4587 26 23.6448 26 22.7961V9.19609C26 8.3474 25.6628 7.53347 25.0627 6.93335C24.4626 6.33323 23.6487 5.99609 22.8 5.99609ZM23.8 22.5321C23.8 22.8673 23.6668 23.1888 23.4298 23.4259C23.1927 23.6629 22.8712 23.7961 22.536 23.7961H9.46399C9.12908 23.795 8.80818 23.6615 8.57136 23.4247C8.33454 23.1879 8.20105 22.867 8.2 22.5321V9.4601C8.20105 9.12519 8.33454 8.80429 8.57136 8.56747C8.80818 8.33066 9.12908 8.19715 9.46399 8.19609H22.536C22.8712 8.19609 23.1927 8.32926 23.4298 8.56631C23.6668 8.80335 23.8 9.12486 23.8 9.4601V22.5321Z" fill="#3B3B3B"/>
          <path d="M13.3817 22.9999C13.7435 22.9996 14.0904 22.8663 14.3461 22.6292L20.6009 16.8376C20.8565 16.6007 21 16.2795 21 15.9446C21 15.6098 20.8565 15.2886 20.6009 15.0517L14.4689 9.36955C14.213 9.13292 13.8662 9 13.5045 9C13.1429 9 12.796 9.13292 12.5401 9.36955C12.4129 9.48695 12.312 9.62644 12.2431 9.78004C12.1742 9.93363 12.1387 10.0983 12.1387 10.2646C12.1387 10.4309 12.1742 10.5956 12.2431 10.7492C12.312 10.9028 12.4129 11.0423 12.5401 11.1597L17.6896 15.9446L12.3991 20.8433C12.1436 21.0802 12 21.4014 12 21.7363C12 22.0711 12.1436 22.3923 12.3991 22.6292C12.5279 22.7486 12.6811 22.8429 12.8499 22.9066C13.0187 22.9703 13.1995 23.002 13.3817 22.9999Z" fill="#3B3B3B"/>
        </svg>

      </button>
      <a class="header-brand d-md-none" href="#">
        <svg width="118" height="46" alt="CoreUI Logo">
          <use xlink:href="assets/brand/coreui.svg#full"></use>
        </svg>
      </a>
      <ul class="header-nav d-none d-md-flex">
        <li class="nav-item item_display">
          <a id="titlePage" class="nav-link" href="#">Quản Lý Công Việc</a> <span class="badge badge-sm bg-edit ms-auto">{{ UserStore.user.position }}</span>
        </li>
      </ul>

      <!-- Noti -->
      <ul class="header-nav ms-auto">
        <li class="nav-item dropdown">
          <span @click="toggleNoti()" id="click-noti" class="nav-link py-0" data-coreui-toggle="dropdown" href="#" role="button"
            aria-haspopup="true" aria-expanded="false">
            <div class="noti-ocean">
              <div class="noti-count-total" v-if="count_noti_not_seen > 0" :class="count_noti_not_seen < 10 ? 'noti-count-down-10' : (count_noti_not_seen == '99+' ? 'noti-count-up-99' : 'noti-count-up-10')  " >{{ count_noti_not_seen }}</div>
              <!-- <img class="avatar-img" src="assets/img/avatars/8.jpg" alt="user@email.com"> -->
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M27.5721 21.3756V17.6912C27.5699 16.1089 27.0572 14.5695 26.1101 13.3019C25.1629 12.0343 23.832 11.1062 22.3152 10.6556V9.19C22.3152 8.57602 22.0713 7.98719 21.6372 7.55305C21.203 7.1189 20.6142 6.875 20.0002 6.875C19.3862 6.875 18.7974 7.1189 18.3633 7.55305C17.9291 7.98719 17.6852 8.57602 17.6852 9.19V10.6556C16.1684 11.1062 14.8375 12.0343 13.8904 13.3019C12.9432 14.5695 12.4305 16.1089 12.4283 17.6912V21.3725C12.4283 21.3987 12.3702 24.0513 9.64083 26.8144C9.38678 27.0735 9.21495 27.402 9.14691 27.7585C9.07888 28.1149 9.11767 28.4836 9.25842 28.8181C9.39917 29.1526 9.6356 29.4381 9.93803 29.6387C10.2405 29.8393 10.5954 29.9461 10.9583 29.9456H16.2483C16.402 30.8288 16.8624 31.6294 17.5484 32.2064C18.2345 32.7834 19.1022 33.0997 19.9986 33.0996C20.895 33.0995 21.7627 32.7831 22.4486 32.206C23.1346 31.6289 23.5949 30.8282 23.7483 29.945H29.0421C29.4049 29.9453 29.7597 29.8385 30.062 29.6379C30.3643 29.4373 30.6006 29.152 30.7413 28.8176C30.8821 28.4832 30.9209 28.1147 30.853 27.7583C30.7851 27.4019 30.6134 27.0736 30.3596 26.8144C27.6302 24.0519 27.5721 21.3988 27.5721 21.3756ZM18.9352 9.19C18.9379 8.98058 19.002 8.77656 19.1195 8.60319C19.237 8.42983 19.4028 8.29474 19.5963 8.21464C19.7898 8.13455 20.0026 8.11297 20.2082 8.15258C20.4139 8.1922 20.6034 8.29126 20.7533 8.4375C21.2258 8.825 21.0265 9.87688 21.0652 10.4013C20.3571 10.3276 19.6433 10.3276 18.9352 10.4013V9.19ZM19.9983 31.875C19.4309 31.8733 18.8802 31.6827 18.4331 31.3332C17.9861 30.9837 17.6682 30.4953 17.5296 29.945H22.4671C22.3285 30.4952 22.0107 30.9835 21.5638 31.333C21.1169 31.6825 20.5657 31.8732 19.9983 31.875ZM29.5915 28.3275C29.5475 28.437 29.4716 28.5306 29.3736 28.5962C29.2755 28.6617 29.16 28.6962 29.0421 28.695C29.0421 28.695 13.9965 28.6975 10.9583 28.695C10.8404 28.6962 10.7249 28.6617 10.6268 28.5962C10.5288 28.5306 10.4529 28.437 10.409 28.3275C10.3631 28.2219 10.3502 28.105 10.3718 27.9919C10.3934 27.8789 10.4486 27.775 10.5302 27.6938C13.6427 24.5425 13.6783 21.5031 13.6783 21.3756V17.6912C13.6825 16.8529 13.8585 16.0243 14.1953 15.2566C14.5322 14.4889 15.0228 13.7984 15.6368 13.2276C16.2509 12.6568 16.9753 12.2179 17.7656 11.938C18.5558 11.6581 19.395 11.543 20.2315 11.6C21.8462 11.6018 23.3944 12.2441 24.5362 13.3859C25.678 14.5277 26.3203 16.0759 26.3221 17.6906V21.375C26.3221 21.5025 26.3577 24.5419 29.4702 27.6931C29.5518 27.7743 29.607 27.8782 29.6286 27.9913C29.6503 28.1043 29.6373 28.2219 29.5915 28.3275ZM31.7902 11.6631C31.4587 10.9406 30.987 10.291 30.4027 9.75199C29.8183 9.213 29.1328 8.79531 28.3858 8.52313C28.3082 8.49202 28.2251 8.47682 28.1415 8.47841C28.0579 8.48001 27.9754 8.49838 27.899 8.53242C27.8226 8.56646 27.7538 8.6155 27.6967 8.67661C27.6396 8.73772 27.5954 8.80968 27.5666 8.88821C27.5378 8.96673 27.5251 9.05024 27.5292 9.13378C27.5332 9.21732 27.554 9.29919 27.5903 9.37454C27.6266 9.44989 27.6777 9.51719 27.7405 9.57245C27.8032 9.62771 27.8765 9.66981 27.9558 9.69625C29.1465 10.1419 30.1136 11.0387 30.6476 12.1925C31.1817 13.3462 31.2396 14.6638 30.809 15.86C30.7518 16.0156 30.7588 16.1876 30.8284 16.3381C30.898 16.4886 31.0246 16.6053 31.1802 16.6625C31.3359 16.7197 31.5079 16.7127 31.6583 16.6431C31.8088 16.5735 31.9255 16.4469 31.9827 16.2913C32.2583 15.5454 32.3832 14.7523 32.3502 13.9579C32.3172 13.1635 32.1268 12.3835 31.7902 11.6631Z"
                  fill="#00A5DC" />
                <path
                  d="M29.1415 12.5008C29.5322 13.254 29.7823 15.6672 28.6814 15.7895C28.5835 15.7888 28.4872 15.7634 28.4005 15.7154C28.3139 15.6674 28.2394 15.5981 28.1835 15.5135C28.1275 15.4289 28.0917 15.3314 28.0791 15.2292C28.0664 15.127 28.0772 15.0231 28.1106 14.9262C28.3221 14.3114 28.2944 13.6336 28.0334 13.0402C27.7724 12.4469 27.2993 11.986 26.7171 11.7579C26.5654 11.7001 26.4417 11.5813 26.3733 11.4276C26.3048 11.2739 26.2971 11.0978 26.3519 10.9382C26.9666 9.66111 28.8768 11.6881 29.1415 12.5008Z"
                  fill="#00A5DC" />
                <path
                  d="M20 2.5C15.3603 2.50513 10.9121 4.35052 7.6313 7.6313C4.35052 10.9121 2.50513 15.3603 2.5 20C3.46125 43.2163 36.5425 43.2094 37.5 20C37.4949 15.3603 35.6495 10.9121 32.3687 7.6313C29.0879 4.35052 24.6397 2.50513 20 2.5ZM20 36.25C15.6918 36.245 11.5614 34.5314 8.515 31.485C5.4686 28.4386 3.75496 24.3082 3.75 20C4.6425 -1.55813 35.3606 -1.55188 36.25 20C36.245 24.3082 34.5314 28.4386 31.485 31.485C28.4386 34.5314 24.3082 36.245 20 36.25Z"
                  fill="#00A5DC" />
                <!-- <circle cx="32.5" cy="6.5" r="4.5" fill="#FB4E4E" /> -->
              </svg>

            </div>
          </span>
          <!-- dropdown noti -->
          <div id="div-noti" class="div-noti">
              <div id="header-noti" class="header-noti">
                <div class="left-header-noti">
                  <h4>Thông báo</h4>
                </div>
                <div @click="updateAllNotiSeen()" class="right-header-noti cursor-pointer">Đánh dấu tất cả là đã đọc</div>
              </div>
            
              <div class="div-noti-scroll">
                <!-- begin 1 noti -->
                <div v-for="noti in notifications" class="item-noti" :title="helper.formatDateTime(noti.created_at, 'HH:mm dd-MM-yyyy')">
                  <div href="" @click.stop="notificationRedirect(noti.url_redirect), noti.is_seen == '0' ? updateNotiIsSeen(noti.id, '1') : ''">
                    <span v-if="noti.type_noti == '0'" class="icon-noti">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                        <path
                          d="M22.3559 2.75684H9.85916C8.40125 2.75684 7.21507 3.99036 7.21507 5.50669V8.80655H2.64409C1.18608 8.80645 0 10.04 0 11.5563V17.2604C0 18.509 0.804198 19.566 1.90234 19.9002V22.4719C1.90235 22.6194 1.94304 22.7639 2.01961 22.8881C2.09618 23.0123 2.2054 23.1111 2.33432 23.1727C2.46323 23.2343 2.60644 23.2562 2.74695 23.2357C2.88746 23.2153 3.01937 23.1533 3.12704 23.0572L6.5409 20.0103H12.799C14.2569 20.0103 15.443 18.7767 15.443 17.2604V15.5814H17.8265L21.5328 19.1512C21.6387 19.2531 21.7708 19.3208 21.9131 19.3458C22.0553 19.3709 22.2015 19.3522 22.3337 19.2921C22.4659 19.232 22.5784 19.1332 22.6574 19.0076C22.7364 18.8821 22.7785 18.7353 22.7785 18.5852V15.5463C24.0363 15.3353 25 14.1982 25 12.8315V5.50669C25 3.99041 23.8138 2.75684 22.3559 2.75684ZM13.9596 17.2604C13.9596 17.926 13.439 18.4675 12.799 18.4675H6.26635C6.08913 18.4675 5.91777 18.5335 5.78329 18.6535L3.38578 20.7933V19.2389C3.38578 18.8129 3.0537 18.4675 2.64409 18.4675C2.0041 18.4675 1.48344 17.926 1.48344 17.2604V11.5563C1.48344 10.8908 2.0041 10.3492 2.64409 10.3492H7.21507V12.8316C7.21507 14.3478 8.4012 15.5814 9.85916 15.5814H13.9596V17.2604ZM23.5165 12.8316C23.5165 13.4971 22.9959 14.0386 22.3559 14.0386H22.0367C21.6271 14.0386 21.295 14.384 21.295 14.81V16.8195L18.6212 14.244C18.4841 14.1119 18.3041 14.0385 18.1172 14.0385H9.85916C9.21922 14.0385 8.69852 13.497 8.69852 12.8315V5.50669C8.69852 4.84115 9.21917 4.29962 9.85916 4.29962H22.3559C22.9958 4.29962 23.5165 4.8411 23.5165 5.50669V12.8316Z"
                          fill="#00A5DC" />
                        <path
                          d="M20.4115 6.9834H11.8032C11.3936 6.9834 11.0615 7.32876 11.0615 7.75477C11.0615 8.18077 11.3936 8.52613 11.8032 8.52613H20.4115C20.8211 8.52613 21.1532 8.18077 21.1532 7.75477C21.1532 7.32876 20.8211 6.9834 20.4115 6.9834ZM20.4115 10.1718H11.8032C11.3936 10.1718 11.0615 10.5172 11.0615 10.9432C11.0615 11.3692 11.3936 11.7145 11.8032 11.7145H20.4115C20.8211 11.7145 21.1532 11.3692 21.1532 10.9432C21.1532 10.5172 20.8211 10.1718 20.4115 10.1718Z"
                          fill="#00A5DC" />
                      </svg>
                    </span>

                    <span class="icon-noti">
                      <span v-if="noti.is_seen == '0'" style="position: absolute; left: -10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                          <circle cx="3" cy="3" r="3" fill="#FB4E4E"/>
                        </svg>
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <g clip-path="url(#clip0_250_440)">
                          <mask id="mask0_250_440" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="26" height="26">
                            <path d="M0 7.62939e-05H25.9999V26H0V7.62939e-05Z" fill="white" />
                          </mask>
                          <g mask="url(#mask0_250_440)">
                            <path
                              d="M1.72656 0.507887H18.789C19.4621 0.507887 20.0078 1.05353 20.0078 1.72663V24.2734C20.0078 24.9465 19.4621 25.4922 18.789 25.4922H1.72656C1.05346 25.4922 0.507812 24.9465 0.507812 24.2734V1.72663C0.507812 1.05353 1.05346 0.507887 1.72656 0.507887Z"
                              fill="#00A5DC" />
                            <path d="M14.2356 2.53912H17.9765V23.4609H2.53906V2.53912H6.27995" fill="white" />
                            <path
                              d="M7.51953 4.16406H12.9954C13.5914 4.16406 14.0745 3.68093 14.0745 3.08496V0.507823H6.44043V3.08496C6.44043 3.68093 6.92356 4.16406 7.51953 4.16406Z"
                              fill="#FF6977" />
                            <path
                              d="M7.51953 4.16406H12.9954C13.5914 4.16406 14.0745 3.68093 14.0745 3.08496V0.507823H6.44043V3.08496C6.44043 3.68093 6.92356 4.16406 7.51953 4.16406Z"
                              fill="#90E0EF" />
                            <path
                              d="M17.2498 13.2317L23.1998 7.28174C23.7243 6.75723 24.5746 6.75723 25.0991 7.28174C25.6236 7.80621 25.6236 8.65659 25.0991 9.18106L19.1492 15.131L15.7256 16.6553L17.2498 13.2317Z"
                              fill="#FFD600" />
                            <path d="M19.1492 15.131L17.2498 13.2317L15.7256 16.6553L19.1492 15.131Z" fill="#98A1B3" />
                            <path
                              d="M24.4462 9.83398L25.0991 9.18109C25.6237 8.65657 25.6237 7.80624 25.0991 7.28173C24.5747 6.75726 23.7243 6.75726 23.1998 7.28173L22.5469 7.93462L24.4462 9.83398Z"
                              fill="#FF283C" />
                            <path
                              d="M8.22655 9.85158H4.97656V6.60159H8.22655V9.85158ZM8.22655 15.4375H4.97656V12.1875H8.22655V15.4375Z"
                              fill="#3EC8AC" />
                            <path d="M8.22655 21.0234H4.97656V17.7734H8.22655V21.0234Z" fill="#FF3F51" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_250_440">
                            <rect width="26" height="26" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <div class="text-noti">
                      <div v-if="new Date(noti.created_at) > new Date(time_change_noti_and_history)" v-html="getHtmlNoti(noti.type_noti, noti.params)"></div>
                      <div v-else v-html="noti.html_content"></div>
                      <span class="span-noti">
                        {{ calculateTimeDifference(noti.created_at) }}
                      </span>
                    </div>
                  </div>
                </div>
                <!-- begin 1 noti -->
              </div>
          </div>
        </li>
      </ul>

      <!-- User -->
      <ul class="header-nav">
        <li class="nav-item dropdown">
          <span @click="toggleMenuUser()" id="menu-user" class="nav-link" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">
            <div class="avatar avatar-md">
              <img :src="(UserStore.user.url_avatar != '' && UserStore.user.url_avatar != null && UserStore.user.url_avatar != undefined) ? helper.getPathImage(UserStore.user.url_avatar) : require('@/assets/images/avatar/deafault-avatar.png')" alt="avatar" class="border-radius width-height-svg">
            </div>
          </span>
          <!-- begin dropdown user -->
          <div id="dropdown-menu-user" class="dropdown-menu-user">
            <div class="name-user padd-b-15">
              <p>{{ UserStore.user.first_name }} {{ UserStore.user.last_name }}</p>
              <p class="badge badge-sm bg-edit ms-auto">{{ UserStore.user.position }}</p>
            </div>
            <div class="logout-user">
              <a @click.prevent="logout()" href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <g clip-path="url(#clip0_109_4628)">
                    <path
                      d="M10.5348 18.3057H2.91309C2.44563 18.3057 2.06626 17.9336 2.06626 17.4751V2.52492C2.06626 2.06645 2.44567 1.69438 2.91309 1.69438H10.5348C11.0031 1.69438 11.3816 1.32313 11.3816 0.863828C11.3816 0.404531 11.0031 0.0332031 10.5348 0.0332031H2.91309C1.51241 0.0332031 0.372559 1.15117 0.372559 2.52492V17.4751C0.372559 18.8488 1.51241 19.9668 2.91309 19.9668H10.5348C11.0031 19.9668 11.3816 19.5955 11.3816 19.1362C11.3816 18.6769 11.0031 18.3057 10.5348 18.3057Z"
                      fill="black" />
                    <path
                      d="M20.5124 9.40904L15.3636 4.42564C15.0316 4.10337 14.4947 4.10755 14.1661 4.43396C13.8376 4.76036 13.8409 5.28611 14.1746 5.60837L17.8542 9.16982H7.99429C7.52599 9.16982 7.14746 9.54107 7.14746 10.0004C7.14746 10.4597 7.52599 10.8309 7.99429 10.8309H17.8542L14.1746 14.3924C13.841 14.7147 13.8384 15.2404 14.1661 15.5668C14.2449 15.6452 14.3388 15.7074 14.4423 15.7499C14.5458 15.7924 14.6569 15.8143 14.7691 15.8143C14.9842 15.8143 15.1993 15.7346 15.3636 15.5751L20.5124 10.5917C20.5923 10.5144 20.6557 10.4223 20.699 10.3208C20.7423 10.2193 20.7647 10.1104 20.7648 10.0003C20.7648 9.77783 20.6742 9.56603 20.5124 9.40904Z"
                      fill="black" />
                  </g>
                  <defs>
                    <clipPath id="clip0_109_4628">
                      <rect width="20.3922" height="20" fill="white" transform="translate(0.372559)" />
                    </clipPath>
                  </defs>
                </svg>
                <span>
                  Đăng xuất
                </span>
              </a>
            </div>
          </div>
          <!-- end dropdown user -->
        </li>
      </ul>
    </div>
  </header>
  <!--  End Header -->
</template>

<script setup>
import $ from 'jquery'
import { computed, inject, ref } from 'vue';
import service from "../../services/service"
import { userStore } from "../../store/modules/userStore"
import { useRouter } from 'vue-router'
import { format } from 'date-fns';
import helper from '@/services/helper';
import toast from '@/helpers/toast'

const Constant = inject("$constant")
const UserStore = userStore()
const router = useRouter()
const isLoading = inject('isLoading')

const logout = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathLogout
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.post(url, {}, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      localStorage.removeItem('token')
      localStorage.removeItem('is_admin')
      window.location.reload()
    }
  }
}

//get all noti
const time_change_noti_and_history = ref(process.env.VUE_APP_TIME_CHANGE_NOTI_AND_HISTORY)
const allNoti = ref([])
const getAllNoti = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetAllNotiByUserId + '/' + UserStore.user.id
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  const response = await service.get(url, {}, headers);
  if (response.status == 200) {
    if (response.data.returnCode == "200") {
      allNoti.value = response.data.data
    }
  }
}
getAllNoti()
const notifications = computed(() => {
  let notifications = allNoti.value
  notifications = notifications.sort((a, b) => {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)
    return dateB - dateA;
  });
  return notifications
})

const count_noti_not_seen = computed(() => {
  let notifications = allNoti.value
  let countnoti = notifications.filter(item => item.is_seen == "0").length;
  countnoti = (countnoti > 99) ? '99+' : countnoti;
  return countnoti;
})

const updateNotiIsSeen = async (noti_id, is_seen) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateNotiIsSeen
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    noti_id,
    is_seen
  }
  const response = await service.put(url, params, headers);
  if (response.status == 200) {
    if (response.data.returnCode == "200") {
      allNoti.value = response.data.data
    }
  }
}

const updateAllNotiSeen = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateAllNotiSeen
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    user_id: UserStore.user.id
  }
  const response = await service.put(url, params, headers);
  if (response.status == 200) {
    if (response.data.returnCode == "200") {
      allNoti.value = response.data.data
    }
  }
}

const echo = new Echo({
  broadcaster: "socket.io",
  host: process.env.VUE_APP_URL_LARAVEL_ECHO_SERVER,
  auth: {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
    }
  }
})
echo.join('ocean-notification')
  .listen('OceanNotification', (event) => {
    const idArray = event.to_list_user.map(Number);
    if (idArray.includes(UserStore.user.id)) {
      getAllNoti()
      const toastNotification = toast(toastRedirect, event.url_redirect, event.notification_id)
      toastNotification.fire({
        icon: "info",
        title: "Thông báo mới",
        html: getHtmlNoti(event.type_noti, event.params)
      });
    }
  });

const getHtmlNoti = (type, paramJson) => {
  var html = ""
  let params = JSON.parse(paramJson)
  switch (type) {
    case "1":
      html = `Đến hạn gọi lại cho khách hàng <b>${params[0]}</b>. Vui lòng kiểm tra lại tiến độ.<br>`
      break;
    
    case "2":
      html = `Ngân sách của khách hàng <b>${params[0]}</b> cần cập nhật. Vui lòng kiểm tra.<br>`
      break;
    
    case "3":
      html = ` Bạn đã có thể theo dõi quản lý ngân sách của <b>${params[0]}</b>.<br>`
      break;
    
    case "4":
      html = `Dự án <b>${params[0]}</b> sắp đến ngày bàn giao. Hãy kiểm tra lại tiến độ.<br>`
      break;
    
    case "5":
      html = `Bạn đã được giao cho dự án <b>${params[0]}</b>.<br>`
      break;
    
    case "6":
      html = `<b>${params[0]}</b> đã bình luận trong công việc <b>${params[1]}</b>.<br>`
      break;
    
    case "7":
      html = `Bạn đã được giao cho công việc <b>${params[0]}</b> của dự án <b>${params[1]}</b>.<br>`
      break;
    
    case "8":
      html = `Công việc <b>${params[0]}</b> đã được bàn giao cho bạn, vui lòng kiểm tra.<br>`
      break;
    
    case "9":
      html = `<b>${params[0]}</b> đã chuyển trạng thái của công việc <b>${params[1]}</b> của dự án <b>${params[2]}</b> thành <b>${params[3]}</b>.<br>`
      break;
    
    case "10":
      html = `Chú ý <b>${params[0]}</b> mai đến hạn gọi.<br>`
      break;
    
    case "11":
      html = `Quá hạn gọi lại cho khách hàng <b>${params[0]}</b>. Vui lòng kiểm tra lại tiến độ.<br>`
      break;
         
    case "12":
      html = `<b>${params[0]}</b> đã nhắc đến bạn trong bình luận công việc <b>${params[1]}</b>.`
      break;

    case "13":
      html = `Deadline <b>${params[0]}</b> còn <b>${params[1]}h</b> nữa đến hạn, hãy kiểm tra lại tiến độ!!`
      break;
        
    case "14":
      html = `Deadline <b>${params[0]}</b> đã quá hạn, hãy kiểm tra lại tiến độ!!`
      break;
    
    default:
      html = `[Không thể xác định loại thông báo]<br>`
      break;
    }
    return html
}

const toggleMenuUser = () => {
  $("#dropdown-menu-user").toggle()
}

const toggleNoti = () => {
  $("#div-noti").toggle();
}

const toggleSidebar = () => {
  $("#sidebar").toggle();
  $('#wrapper-side').toggleClass('set-side-bar');
  $('#side-bar-toggle').toggle();
  $('#logo_admin_header').toggle();
  $('#icon-header-1').toggle();
  $('#icon-header-2').toggle();
}

$(document).click(function(event) {
  if (!$(event.target).closest('#click-noti').length) {
    if ($('#div-noti').is(':visible')) {
      if (!$(event.target).closest('.header-noti').length) { 
        $("#div-noti").toggle();
      }
    }
  }

  if (!$(event.target).closest('#menu-user').length) {
    if ($('#dropdown-menu-user').is(':visible')) {
      if (!$(event.target).closest('.dropdown-menu-user').length) { 
        $("#dropdown-menu-user").toggle();
      }
    }
  }
});

const calculateTimeDifference = (dateTime) => {
  const messageDate = new Date(dateTime);
  const currentDate = new Date();

  const timeDifferenceInSeconds = Math.floor((currentDate - messageDate) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `Vừa xong`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} phút trước`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} giờ trước`;
  } else if (timeDifferenceInSeconds < 604800) {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} ngày trước`;
  } else if (timeDifferenceInSeconds < 2419200) {
    const weeks = Math.floor(timeDifferenceInSeconds / 604800);
    return `${weeks} tuần trước`;
  } else if (timeDifferenceInSeconds < 29030400) {
    const months = Math.floor(timeDifferenceInSeconds / 2419200);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(timeDifferenceInSeconds / 29030400);
    return `${years} năm trước`;
  }
}

const toastRedirect = (url_redirect, notification_id) => {
  notificationRedirect(url_redirect)
  updateNotiIsSeen(notification_id, "1")
}

const notificationRedirect = (url_redirect) => {
  const router_link = JSON.parse(url_redirect)
  router_link.params.key = Date.now().toString()
  routerPush(router_link.name, router_link.params)
  $("#div-noti").toggle();
}

const routerPush = (name, params = {}) => {
  router.push({
    name,
    params
  })
}
</script>

<style scoped></style>