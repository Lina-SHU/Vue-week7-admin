(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cc135238"],{b0c0:function(e,t,o){var c=o("83ab"),a=o("9bf2").f,r=Function.prototype,n=r.toString,l=/^\s*function ([^ (]*)/,d="name";c&&!(d in r)&&a(r,d,{configurable:!0,get:function(){try{return n.call(this).match(l)[1]}catch(e){return""}}})},da25:function(e,t,o){"use strict";o.r(t);o("b0c0");var c=o("7a23"),a={class:"container py-3"},r=Object(c["createVNode"])("h1",null,"訂單列表",-1),n={class:"d-flex justify-content-end"},l={class:"table"},d=Object(c["createVNode"])("thead",null,[Object(c["createVNode"])("tr",null,[Object(c["createVNode"])("th",{scope:"col"},"訂單編號"),Object(c["createVNode"])("th",{scope:"col"},"訂購人姓名"),Object(c["createVNode"])("th",{scope:"col"},"訂購人 Email"),Object(c["createVNode"])("th",{scope:"col"},"訂購日期"),Object(c["createVNode"])("th",{scope:"col"},"是否付款"),Object(c["createVNode"])("th",{scope:"col"})])],-1);function i(e,t,o,i,s,b){var u=Object(c["resolveComponent"])("loading"),p=Object(c["resolveComponent"])("pagination"),O=Object(c["resolveComponent"])("editModal");return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],null,[Object(c["createVNode"])(u,{active:s.isLoading,"onUpdate:active":t[1]||(t[1]=function(e){return s.isLoading=e})},null,8,["active"]),Object(c["createVNode"])("div",a,[r,Object(c["createVNode"])("div",n,[s.orderList.length>=2?(Object(c["openBlock"])(),Object(c["createBlock"])("button",{key:0,class:"btn btn-danger",onClick:t[2]||(t[2]=function(){return b.deleteAll&&b.deleteAll.apply(b,arguments)})},"刪除所有訂單")):Object(c["createCommentVNode"])("",!0)]),Object(c["createVNode"])("table",l,[d,Object(c["createVNode"])("tbody",null,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(s.orderList,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])("tr",{key:e.id},[Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(e.id),1),Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(e.user.name),1),Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(e.user.email),1),Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(new Date(1e3*e.create_at).getFullYear())+"/"+Object(c["toDisplayString"])(new Date(1e3*e.create_at).getMonth()+1)+"/"+Object(c["toDisplayString"])(new Date(1e3*e.create_at).getDate()),1),Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(e.is_paid?"已付款":"未付款"),1),Object(c["createVNode"])("td",null,[Object(c["createVNode"])("button",{class:"btn btn-primary me-2",type:"button",onClick:function(t){return b.editOrder(e)}},"編輯",8,["onClick"]),Object(c["createVNode"])("button",{class:"btn btn-outline-danger",type:"button",onClick:function(t){return b.deleteOrder(e.id)}},"刪除",8,["onClick"])])])})),128))])]),Object(c["createVNode"])(p,{pages:s.pagination,onGetList:b.getOrder},null,8,["pages","onGetList"]),Object(c["createVNode"])(O,{ref:"editModal","temp-order":s.tempOrder,onGetOrder:b.getOrder},null,8,["temp-order","onGetOrder"])])],64)}o("99af");var s=o("1799"),b={class:"modal fade",id:"modal",ref:"editModal"},u={class:"modal-dialog"},p={class:"modal-content"},O=Object(c["createVNode"])("div",{class:"modal-header"},[Object(c["createVNode"])("h5",{class:"modal-title"},"訂單編輯"),Object(c["createVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),m={class:"modal-body"},h={class:"mb-3"},j=Object(c["createVNode"])("label",{for:"orderId",class:"form-label"},"訂單編號",-1),f={class:"accordion accordion-flush",id:"orderAccordion"},V={class:"accordion-item"},g=Object(c["createVNode"])("h2",{class:"accordion-header",id:"flush-headingOne"},[Object(c["createVNode"])("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#flush-collapseOne","aria-expanded":"false","aria-controls":"flush-collapseOne"}," 訂購人資訊 ")],-1),N={id:"flush-collapseOne",class:"accordion-collapse collapse","aria-labelledby":"flush-headingOne","data-bs-parent":"#orderAccordion"},v={class:"accordion-body"},y={class:"mb-3"},k=Object(c["createVNode"])("label",{for:"orderName",class:"form-label"},"訂單人姓名",-1),x={class:"mb-3"},w=Object(c["createVNode"])("label",{for:"email",class:"form-label"},"訂單人Email",-1),L={class:"mb-3"},D=Object(c["createVNode"])("label",{for:"tel",class:"form-label"},"訂單人電話",-1),M={class:"mb-3"},C=Object(c["createVNode"])("label",{for:"address",class:"form-label"},"訂單人地址",-1),T={class:"mb-3"},B=Object(c["createVNode"])("label",{for:"message",class:"form-label"},"留言",-1),S={class:"accordion-item"},U=Object(c["createVNode"])("h2",{class:"accordion-header",id:"flush-headingTwo"},[Object(c["createVNode"])("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#flush-collapseTwo","aria-expanded":"false","aria-controls":"flush-collapseTwo"}," 訂單資訊 ")],-1),$={id:"flush-collapseTwo",class:"accordion-collapse collapse","aria-labelledby":"flush-headingTwo","data-bs-parent":"#orderAccordion"},A={class:"accordion-body"},_={class:"mb-3"},F=Object(c["createVNode"])("label",{for:"total",class:"form-label"},[Object(c["createTextVNode"])("訂單總額 "),Object(c["createVNode"])("small",{class:"text-danger"},"*必填")],-1),G={class:"form-check"},J=Object(c["createVNode"])("label",{class:"form-check-label",for:"isPaid"}," 是否付款 ",-1),E={class:"modal-footer"},I=Object(c["createVNode"])("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"取消",-1);function P(e,t,o,a,r,n){var l=Object(c["resolveComponent"])("loading");return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],null,[Object(c["createVNode"])(l,{active:r.isLoading,"onUpdate:active":t[1]||(t[1]=function(e){return r.isLoading=e})},null,8,["active"]),Object(c["createVNode"])("div",b,[Object(c["createVNode"])("div",u,[Object(c["createVNode"])("div",p,[O,Object(c["createVNode"])("div",m,[Object(c["createVNode"])("div",h,[j,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"text",class:"form-control",id:"orderId",disabled:"","onUpdate:modelValue":t[2]||(t[2]=function(e){return r.temp.id=e})},null,512),[[c["vModelText"],r.temp.id]])]),Object(c["createVNode"])("div",f,[Object(c["createVNode"])("div",V,[g,Object(c["createVNode"])("div",N,[Object(c["createVNode"])("div",v,[Object(c["createVNode"])("div",y,[k,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"text",class:"form-control",id:"orderName","onUpdate:modelValue":t[3]||(t[3]=function(e){return r.temp.user.name=e})},null,512),[[c["vModelText"],r.temp.user.name]])]),Object(c["createVNode"])("div",x,[w,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"text",class:"form-control",id:"email","onUpdate:modelValue":t[4]||(t[4]=function(e){return r.temp.user.email=e})},null,512),[[c["vModelText"],r.temp.user.email]])]),Object(c["createVNode"])("div",L,[D,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"tel",class:"form-control",id:"tel","onUpdate:modelValue":t[5]||(t[5]=function(e){return r.temp.user.tel=e})},null,512),[[c["vModelText"],r.temp.user.tel]])]),Object(c["createVNode"])("div",M,[C,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"text",class:"form-control",id:"address","onUpdate:modelValue":t[6]||(t[6]=function(e){return r.temp.user.address=e})},null,512),[[c["vModelText"],r.temp.user.address]])]),Object(c["createVNode"])("div",T,[B,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"text",class:"form-control",id:"message","onUpdate:modelValue":t[7]||(t[7]=function(e){return r.temp.message=e}),disabled:""},null,512),[[c["vModelText"],r.temp.message]])])])])]),Object(c["createVNode"])("div",S,[U,Object(c["createVNode"])("div",$,[Object(c["createVNode"])("div",A,[Object(c["createVNode"])("div",_,[F,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"number",class:"form-control",id:"total","onUpdate:modelValue":t[8]||(t[8]=function(e){return r.temp.total=e})},null,512),[[c["vModelText"],r.temp.total,void 0,{number:!0}]])]),Object(c["createVNode"])("div",G,[Object(c["withDirectives"])(Object(c["createVNode"])("input",{class:"form-check-input",type:"checkbox",value:"",id:"isPaid","onUpdate:modelValue":t[9]||(t[9]=function(e){return r.temp.is_paid=e})},null,512),[[c["vModelCheckbox"],r.temp.is_paid]]),J])])])])])]),Object(c["createVNode"])("div",E,[I,Object(c["createVNode"])("button",{type:"button",class:"btn btn-primary",onClick:t[10]||(t[10]=function(){return n.editOrder&&n.editOrder.apply(n,arguments)})},"編輯")])])])],512)],64)}var Y=o("7c2b"),q=o.n(Y),z=o("1940"),H=o.n(z),K={data:function(){return{modal:"",temp:{user:{}},isLoading:!1}},emits:["getOrder"],props:["tempOrder"],methods:{openModal:function(){this.modal.show()},hideModal:function(){this.modal.hide()},editOrder:function(){var e=this;if(this.isLoading=!0,!this.temp.total)return this.isLoading=!1,void H()({text:"必填項目要填寫唷！",icon:"error",button:!1,timer:1500});var t="".concat("https://vue3-course-api.hexschool.io/","api/").concat("linachen","/admin/order/").concat(this.temp.id);this.$http.put(t,{data:this.temp}).then((function(t){t.data.success&&(e.isLoading=!1,H()({text:"編輯成功",icon:"success",button:!1,timer:1500}),e.hideModal(),e.$emit("getOrder"))})).catch((function(e){console.log(e)}))}},mounted:function(){this.modal=new q.a(this.$refs.editModal,{backdrop:"static"})},watch:{tempOrder:function(){this.temp=this.tempOrder}}};K.render=P;var Q=K,R={data:function(){return{orderList:[],pagination:[],tempOrder:[],isLoading:!1}},components:{pagination:s["a"],editModal:Q},methods:{getOrder:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var o="".concat("https://vue3-course-api.hexschool.io/","api/").concat("linachen","/admin/orders?page=").concat(t);this.$http.get(o).then((function(t){t.data.success&&(e.isLoading=!1,e.orderList=t.data.orders,e.pagination=t.data.pagination)})).catch((function(e){console.log(e)}))},deleteOrder:function(e){var t=this;this.isLoading=!0;var o="".concat("https://vue3-course-api.hexschool.io/","api/").concat("linachen","/admin/order/").concat(e);this.$http.delete(o).then((function(e){console.log(e),e.data.success&&(t.isLoading=!1,H()({text:"刪除成功",button:!1,timer:1500}),t.getOrder())})).catch((function(e){console.log(e)}))},deleteAll:function(){var e=this;this.isLoading=!0;var t="".concat("https://vue3-course-api.hexschool.io/","api/").concat("linachen","/admin/orders/all");this.$http.delete(t).then((function(t){console.log(t),t.data.success&&(e.isLoading=!1,H()({text:"刪除所有訂單成功",button:!1,timer:1500}),e.getOrder())})).catch((function(e){console.log(e)}))},editOrder:function(e){this.tempOrder=JSON.parse(JSON.stringify(e)),this.$refs.editModal.openModal()}},created:function(){this.getOrder()}};R.render=i;t["default"]=R}}]);
//# sourceMappingURL=chunk-cc135238.39b379a9.js.map