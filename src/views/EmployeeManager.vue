<template>
  <div class="header-quan-ly-nhan-vien">
    <div class="search-quan-ly-nhan-vien">
      <input @keydown="loadingSearch()" v-model="keywordName" type="text" placeholder="nhập tên nhân viên">
    </div>
    <div class="search-quan-ly-nhan-vien mar-l-15">
      <select v-model="keywordEmploymentState" class="form-control-cskh height-33">
        <option value="">Tất cả</option>
        <option value="1">Đang làm việc</option>
        <option value="0">Đã nghỉ việc</option>
      </select>
    </div>
    <div class="create-nhan-vien">
      <div class="create-products">
        <span><a @click.prevent="routerPush('AddNewEmployeeManager')" href="">+ Thêm mới nhân viên</a></span>
      </div>
    </div>
  </div>
  <div class="table table-quan-ly table-quan-ly-nhan-vien">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Họ
            <img @click="toggleSort(), sortBy = 'first_name'" src="@/assets/images/sort-table.svg" alt="">
          </th>
          <th>Tên
            <img @click="toggleSort(), sortBy = 'last_name'" src="@/assets/images/sort-table.svg" alt="">
          </th>
          <th>Tên Đăng Nhập
            <img @click="toggleSort(), sortBy = 'user_name'" src="@/assets/images/sort-table.svg" alt="">
          </th>
          <th>Email
            <img @click="toggleSort(), sortBy = 'email'" src="@/assets/images/sort-table.svg" alt="">
          </th>
          <th>Chức vụ
            <img @click="toggleSort(), sortBy = 'position'" src="@/assets/images/sort-table.svg" alt="">
          </th>
          <th>Tình trạng
            <img @click="toggleSort(), sortBy = 'employment_state'" src="@/assets/images/sort-table.svg" alt="">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>
            <a @click.prevent="routerPush('EditEmployeeManager', { userId: user.id })" href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M1.89274 16H2.00086L7.21706 14.8648C7.31865 14.8479 7.41281 14.8008 7.4873 14.7297L16.325 5.89193C16.6446 5.57302 16.8976 5.19374 17.0693 4.77616C17.241 4.35858 17.3279 3.91103 17.325 3.45954C17.3262 2.54048 16.9672 1.65756 16.325 1.00009C16.0061 0.680482 15.6269 0.427482 15.2093 0.255811C14.7917 0.084141 14.3441 -0.00277153 13.8926 0.000130458C13.4385 -0.00389235 12.9885 0.0851604 12.5701 0.261796C12.1518 0.438431 11.774 0.698904 11.4602 1.02715L2.64946 9.86488C2.57174 9.92741 2.51513 10.0123 2.48729 10.1081L1.3522 15.3243C1.33692 15.4166 1.34363 15.5113 1.37181 15.6005C1.4 15.6897 1.44884 15.7711 1.51438 15.8378C1.61419 15.9397 1.75018 15.9979 1.89274 16ZM13.8926 1.08121C15.1912 1.0811 16.244 2.13378 16.2441 3.43238L16.244 3.45954C16.2483 3.7657 16.1907 4.06958 16.0746 4.3529C15.9585 4.63622 15.7863 4.89312 15.5683 5.10816L12.244 1.75681C12.4609 1.54131 12.7181 1.3707 13.001 1.25477C13.2839 1.13884 13.5869 1.07986 13.8926 1.08121ZM11.4872 2.54064L14.8115 5.86493L7.10889 13.5405L3.7846 10.2432L11.4872 2.54064ZM3.35218 11.3244L6.02781 14L2.5954 14.7568L3.35218 11.3244ZM19.0548 18.9189H0.946788C0.648248 18.9189 0.40625 19.1609 0.40625 19.4594C0.40625 19.758 0.648248 20 0.946788 20H19.0548C19.3533 20 19.5953 19.758 19.5953 19.4594C19.5953 19.1609 19.3533 18.9189 19.0548 18.9189Z"
                  fill="#00B2EE" />
              </svg>
            </a>
          </td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.user_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.employment_state == "1" ? "Đang làm việc" : "Đã nghỉ việc" }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-quanly-nhan-vien text-right mar-t-20">
      <div v-if="pageLink.length > 1" class="pagination">
        <a @click.prevent="changePage('prev')" href=""><img src="@/assets/images/pre.svg" alt=""></a>
        <a v-for="page in pageLink" :class="pageActive == page ? 'active' : ''" @click.prevent="changePage(page)"
          href="">{{ page }}</a>
        <a @click.prevent="changePage('next')" href="#"><img src="@/assets/images/next.svg" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from "vue"
import service from "../services/service"
import { useRouter } from 'vue-router'

const router = useRouter()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

//setting page
const pageActive = ref(1)
const countRow = ref(10)
const changePage = async (page) => {
  if (page == "prev") {
    if (pageActive.value > 1) {
      pageActive.value--
    }
  } else if (page == "next") {
    if (pageActive.value < pageLink.value.length) {
      pageActive.value++
    }
  } else {
    pageActive.value = page
  }
}
var typingTimerOn
var typingTimerOff
const keywordName = ref("")
const loadingSearch = () => {
  clearTimeout(typingTimerOn)
  clearTimeout(typingTimerOff)
  typingTimerOn = setTimeout(() => {
    isLoading.value = true
  }, 1000)

  typingTimerOff = setTimeout(() => {
    isLoading.value = false
    searchByName.value = keywordName.value
  }, 1500)
}
const keywordEmploymentState = ref("1")
watch([keywordEmploymentState], () => {
  isLoading.value = true
  setTimeout(() => {
    searchBykeywordEmploymentState.value = keywordEmploymentState.value
    isLoading.value = false
  }, 500)
})

//fillter data
const searchByName = ref('')
const searchBykeywordEmploymentState = ref("1")
const userFillter = computed(() => {
  let users = allUser.value
  if (searchBykeywordEmploymentState.value != "") {
    users = users.filter(user => user.employment_state == searchBykeywordEmploymentState.value)
  }
  users = users.filter(user => (user.first_name.toUpperCase() + " " + user.last_name.toUpperCase()).includes(searchByName.value.toUpperCase()))
  return users
})
const sortBy = ref("last_name")
const sort = ref("ASC")
const users = computed(() => {
  let users = userFillter.value
  users = users.sort((a, b) => {
    if (a[sortBy.value] == null && b[sortBy.value] != null) {
      return sort.value == "ASC" ? 1 : -1
    } else if (a[sortBy.value] != null && b[sortBy.value] == null) {
      return sort.value == "ASC" ? -1 : 1
    } else if (a[sortBy.value] == null && b[sortBy.value] == null) {
      return sort.value == "ASC" ? -1 : 1
    } else {
      return sort.value == "ASC" ? a[sortBy.value].localeCompare(b[sortBy.value]) : b[sortBy.value].localeCompare(a[sortBy.value])
    }
  })
  users = users.filter((user, idx) =>
    idx >= (pageActive.value - 1) * countRow.value
    && idx < pageActive.value * countRow.value
    )
  return users
})
const pageLink = computed(() => {
  let pageLink = []
  const countPage = Math.ceil(userFillter.value.length / countRow.value)
  for (let i = 1; i <= countPage; i++) {
    pageLink.push(i)
  }
  return pageLink
})
const toggleSort = () => {
  sort.value = sort.value == "ASC" ? "DESC" : "ASC"
}

//get all data
const allUser = ref([])
const getAllUser = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetAllUser
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    allUser.value = response.data.data
  }
}
getAllUser()

const routerPush = (name, params = {}) => {
  router.push({
    name,
    params
  })
}
</script>

<style scoped></style>