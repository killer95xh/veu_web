export default {
    //path call api

    //auth + user
    pathLogin: "api/auth/login",
    pathLogout: "api/auth/logout",
    pathResetPassword: "api/auth/reset-password",
    pathGetUserInfo: "api/get-user-info",
    pathGetAllUser: "api/get-all-user",
    pathGetListSelectSale: "api/get-list-select-sale",
    pathCreateUser: "api/create-user",
    pathUpdateUser: "api/update-user",

    //custommer - CSKH
    pathCreateCustomer: "api/create-customer",
    pathUpdateCustomer: "api/update-customer",
    pathDeleteCustomer: "api/delete-customer",
    pathGetAllCustomer: "api/get-all-customer",
    pathGetCustomerInfo: "api/get-customer-info",

    //custommer budget - ngan sach
    pathUpdateCustomerBudget: "api/update-customer-budget",
    pathGetAllCustomerBudget: "api/get-all-customer-budget",
    pathGetListCustomerBudgetActive: "api/get-list-customer-budget-active",

    //cycle budget
    pathGetAllCycleBudget: "api/get-all-cycle-budget",
    pathCreateCycleBudget: "api/create-cycle-budget",
    pathUpdateCycleBudget: "api/update-cycle-budget",

    //task - quan ly du an
    pathCreateTask: "api/create-task",
    pathUpdateTask: "api/update-task",
    pathGetListUserInTask: "api/get-list-user-in-task",
    pathGetAllTask: "api/get-all-task",
    pathGetTaskInfo: "api/get-task-info",
    pathDeleteTask: "api/delete-task",
    pathDuplicateTask: "api/duplicate-task",

    //sub task - quan ly cong viec
    pathCreateSubTask: "api/create-sub-task",
    pathCreateSubTaskAds: "api/create-sub-task-ads",
    pathUpdateSubTask: "api/update-sub-task",
    pathGetAllSubTask: "api/get-all-sub-task",
    pathGetSubTaskInfo: "api/get-sub-task-info",
    pathGetListSubTask: "api/get-list-sub-task",
    pathGetListFileSubTask: "api/get-list-file-sub-task",
    pathDeleteSubTask: "api/delete-sub-task",

    pathCreateComment: "api/create-sub-task-comment",
    pathGetSubTaskComment: "api/get-sub-task-comment",

    pathRemoveSubTaskFile: "api/remove-sub-task-file",
    
    pathGetAllNotiByUserId: "api/get-all-noti",
    pathUpdateNotiIsSeen: "api/update-noti-is-seen",
    pathUpdateAllNotiSeen: "api/update-all-noti-seen",

    pathCreateHistory: "api/create-history",
    pathGetListHistory: "api/get-list-history",
};
