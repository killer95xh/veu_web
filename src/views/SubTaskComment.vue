<template>
  <div id="div-commentC" class="div-tab">
    <div class="div-comment display-flex custom-div-comment">
      <div class="avatar-comment">
        <img :src="convertUrlAvatar(UserStore.user.url_avatar)" alt="avatar" class="width-height-svg border-radius">
      </div>
      <div class="text-comment" id="div-textarea-comment">
        <span id="p-textarea-comment" style="font-size: 13px; position: absolute; top: -2000px"></span>
        <textarea
          @keydown="handleKeyDown($event)"
          v-model="content"
          ref="textarea_comment"
          cols="30"
          rows="10"
          class="form-control-cskh"
          id="textarea-comment"
          style="width: calc(100% - 15px); height: 56px"
          placeholder="Hãy nhập bình luận">
        </textarea>

        <div ref="div_list_tag" v-if="showUserListTag"
          :style="{ top: userListTagPosition.top + 'px', left: userListTagPosition.left + 'px' }"
          class="dropdown-comment-tag"
          style="width: 220px; right:0; margin-top:3px">
          <div class="position-relative div-search-ocean">
            <input ref="input_search_tag" @keydown.stop="tagUserKeyDownESC($event)" v-model="searchUserByLastName" type="text" class="input-search-ocean">
          </div>
          <div class="list-item-search-ocean">
            <li v-for="user in fillterListUser"
              @click="addTagComment(user)">
                [{{ user.position }}] {{ user.last_name }}
            </li>
          </div>
        </div>
        <div class="custom-file add-file-comment">
          <input type="file" class="custom-file-input full-width-height" accept="image/*" id="file-comment" multiple
            @change="uploadFileComment($event)">
          <img src="@/assets/images/addfile.svg" alt="" class="custom-file-label" for="file-comment">
        </div>
        <div class="show-text-add-file position-relative">
          <div style="position: absolute;right: -111px;top: -100px;">
            <span style="position:absolute;right: 24px;top: 15px;font-size: 14px;">Tệp Đính Kèm</span>
            <img src="@/assets/images/Union.svg" alt="">
          </div>
        </div>
        <div class=" row-add-file position-relative">
          <ul id="fileList-comment" class="file-list">
            <li v-for="(file, key) in list_file_comment" class="position-relative">
              <img style="width:95px;height:95px;border-radius:20px" :src="file.src" :title="file.file_name" />
              <div class='remove-list' @click="list_file_comment.splice(key, 1)"><span class='close-remove'>x</span></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End div Comment -->
    <div class="set-height-auto padd-l-15 padd-b-30">
      <div v-if="comments && comments.length > 0"
        v-for="comment in comments" class="show-comment display-flex mar-t-15 div-comment">
        <div class="avatar-comment">
          <img :src="convertUrlAvatar(comment.url_avatar)" alt="avatar" class="width-height-svg border-radius">
        </div>
        <div class="text-comment">
          <p class="user-name-comment"><span v-if="comment.position != '' && comment.position != null">[{{
            comment.position }}]</span> {{ comment.last_name }} <span class="time-comment">đã bình luận lúc
              {{ helper.formatDateTime(comment.created_at, 'dd-MM-yyyy HH:mm') }}</span></p>
          <p v-html="convertTextToUrl(comment.content)" class="content-comment space-wrap"></p>
          <div class="list-comment-img">
            <img style="width: 50px;" v-for="file in comment.file_attachments" :src="helper.getPathImage(file.path)"
              alt="file.comment" class="cursor-pointer" @click="showImgPopup($event, '#createSubTaskModal-len-ke-hoach')">
          </div>
        </div>
      </div>
      <div v-else class="no-data-comment text-center" style="padding-top:20px;padding-bottom: 40px;color: #D4D4D4;">Không
        có bình luận</div>
    </div>
  </div>
</template>

<script setup>
import $ from 'jquery'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from "vue"
import service from "../services/service"
import Swal from 'sweetalert2'
import { userStore } from "../store/modules/userStore"
import helper from '@/services/helper'

const props = defineProps(['sub_task_detail', 'allUser', 'usersInTask'])

const UserStore = userStore()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
const div_list_tag = ref(null)
const handleClickOutside = (event) => {
  if (div_list_tag.value && !div_list_tag.value.contains(event.target)) {
    closeTagComment()
  }
}

watch(() => props.sub_task_detail, (newValue, oldValue) => {
  content.value = ""
  list_file_comment.value = []
  comments.value = props.sub_task_detail.comments
})

const comments = ref([])
const getComments = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetSubTaskComment + '/' + props.sub_task_detail.id
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    comments.value = response.data.data
  }
}

const content = ref("")
const list_file_comment = ref([])
const uploadFileComment = (event) => {
  if (window.File && window.FileList && window.FileReader) {
    let files = event.target.files; //FileList object
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      //Only picsselectedImage
      if (!file.type.match('image'))
        continue;
      let picReader = new FileReader();
      picReader.addEventListener("load", function (event) {
        let src = event.target.result;
        let file_name = event.target.name;
        list_file_comment.value.push({ file, src, file_name })
      });
      //Read the image
      picReader.readAsDataURL(file);
    }
    $("#file-comment").val(null)
  } else {
    console.log("Your browser does not support File API");
  }
}
const comment = async () => {
  const text = content.value
  content.value = ""
  if (text.trim() !== "" || list_file_comment.value.length > 0) {
    let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathCreateComment
    let headers = {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
      'content-type': 'multipart/form-data',
    }
    let params = {
      user_id: UserStore.user.id,
      sub_task_id: props.sub_task_detail.id,
      content: text,
      list_file: list_file_comment.value
    }
    list_file_comment.value = []
    const response = await service.post(url, params, headers)
    if (response.status == 200) {
      if (response.data.returnCode == 200) {
        getComments()
      } else {
        Swal.fire('Thất bại', 'Có lỗi xảy ra, vui lòng comment lại!', 'error');
      }
    }
  }
}

const showUserListTag = ref(false)
const userListTagPosition = ref({
  top: 0,
  left: 0,
})
const searchUserByLastName = ref("")
const fillterListUser = computed(() => {
  let listUsers = props.usersInTask.filter(user =>
    user.last_name.includes(searchUserByLastName.value) && user.id != UserStore.user.id
  )
  return listUsers
})

const input_search_tag = ref(null)
const enterTimer = ref(null)
const handleKeyDown = (event) => {
  if (event.shiftKey && event.key === "Enter") {
  } else if (event.key === "Enter") {
    event.preventDefault()
    textarea_comment.value.blur()
    if (enterTimer.value) {
      // Nếu đã có một lần Enter trong khoảng thời gian đợi, bỏ qua lần thứ hai
      clearTimeout(enterTimer.value);
      enterTimer.value = null
      content.value = ""
      return;
    }
    comment()
    enterTimer.value = setTimeout(() => {
      // Đặt lại timer sau khi đã xử lý xong
      enterTimer.value = null
      content.value = ""
    }, 300);
  } else if (event.key === "@") {
    setTimeout(() => {
      // Lấy vị trí con trỏ chuột
      const cursorPosition = event.target.selectionStart;
      const lines = content.value.substr(0, cursorPosition).split('\n');
      const lineIndex = lines.length - 1;
      const pTextareaElement = document.getElementById('p-textarea-comment');
      pTextareaElement.textContent = lines[lineIndex]; // Cập nhật nội dung
      const pTextareaRect = pTextareaElement.getBoundingClientRect();

      // Hiển thị danh sách và cập nhật vị trí
      showUserListTag.value = true
      userListTagPosition.value = {
        top: 10 + (lines.length >= 3 ? 3 : lines.length) * 13,
        left: 20 + pTextareaRect.width,
      }
      setTimeout(() => {
        input_search_tag.value.focus()
      }, 5)
    }, 5)
  }
}

const textarea_comment = ref(null)
const tagUserKeyDownESC = (event) => {
  if (event.key === "Escape") {
    closeTagComment()
  }
}
const closeTagComment = () => {
  showUserListTag.value = false
  textarea_comment.value.focus()
  searchUserByLastName.value = ""
}

const addTagComment = (user) => {
  content.value += `'[${user.position}] ${user.last_name}' `
  closeTagComment()
}

const convertTextToUrl = (content) => {
  let replacedText = content
  const matches = content.match(/@'([^']*)'/g)
  let listUserTag = []
  if (matches != null && matches.length > 0) {
    matches.forEach(string => {
      const position = string.match(/\[(.*)\]/)[1].trim()
      const last_name = string.match(/\](.*)'/)[1].trim()
      listUserTag.push({
        full_text: string,
        position,
        last_name
      })
    });
  }
  listUserTag.forEach(userTag => {
    const user = props.allUser.find(user => user.position === userTag.position && user.last_name === userTag.last_name);
    if (user) {
      replacedText = replacedText.replace(userTag.full_text, `<span class="user-tag">@[${userTag.position}] ${userTag.last_name}</span>`);
    }
  });

  const pattern = /(https?:\/\/\S+)/gi;
  replacedText = replacedText.replace(pattern, function (url) {
    return '<a href="' + url + '" target="_blank">' + url + '</a>';
  });
  return replacedText
}

const showImgPopup = async (event, id) => {
  // Get the modal
  var modal = document.getElementById('myModal-show-img');
  var modalImg = document.getElementById("img01-show-img");
  modal.style.display = "block";
  modalImg.src = event.target.src;
  $(id).removeAttr("tabindex");
}

const convertUrlAvatar = (url) => {
  var url_avatar = ""
  if (url != "" && url != null && url != undefined) {
    url_avatar = helper.getPathImage(url)
  } else {
    url_avatar = require('@/assets/images/avatar/deafault-avatar.png')
  }
  return url_avatar
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
echo.join('new-comment')
  .listen('CommentSubTask', (event) => {
    if (event.sub_task_id != null && event.sub_task_id != undefined && event.sub_task_id != "") {
      if (event.sub_task_id == props.sub_task_detail.id && UserStore.user.id != event.user_id) {
        getComments()
      }
    }
  });
</script>

<style scoped>
.dropdown-comment-tag {
	position: absolute;
	width: 100%;
	margin-top: 5px;
	border-radius: 6px;
	border: 1px solid #00A5DC;
	background: #FFF;
	box-shadow: 4px 4px 6px 0px rgba(0, 0, 0, 0.25);
	z-index: 999;
}
.dropdown-comment-tag li {
	display: flex;
	color: var(--text, #484848);
	border-bottom: 0.1px solid #F2F2F2;
	font-size: 14px;
	/* height: 35px; */
	font-style: normal;
	font-weight: 500;
	line-height: 35px; /* 171.429% */
	padding-left: 10px;
	cursor: pointer;
}
.list-item-search-ocean {
	max-height: 250px;
	overflow: auto;
}
.list-item-search-ocean li:hover {
	background-color: #00A5DC;
	color: #fff;
}
</style>