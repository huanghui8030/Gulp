function formValideFn(formId){
    console.log(11);
    var erroricon = '<i class="iconfont" title="提示">&#xe67d;</i>';
    $("#"+formId).validate({
        rules: {
            zsbh: {
                required: true,
                rangelength: [1,18],
                maxlength: 18
            },
            xm: {
                required: true,
                maxlength: 40
            },
            yzm: {
                required: true,
                maxlength: 10
            },
            mphone:{
                required:true,
                mphone:true
            },
            vcode:{
                required:true,
                minlength:6,
                maxlength:8,
                vcode:true
            },
            sfzh:{
                required:true
            }
        },
        messages: {
            zsbh: {
                required:   erroricon + "请输入证书编号",
                rangelength:erroricon + "请输入正确的证书编号",
                maxlength:  erroricon + "最大长度不超过18位"
            },
            xm: {
                required:  erroricon + "请输入姓名",
                maxlength: erroricon + "最大长度不超过40位"
            },
            yzm: {
                required:  erroricon + "请输入图片验证码",
                maxlength: erroricon + "最大长度不超过10位"
            },
            mphone:{
                required:  erroricon + "手机号码不能为空",
                mphone:    erroricon + "格式不正确，暂不支持170号段"
            },
            vcode:{
                required:  erroricon + '短信验证码不能为空',
                minlength: erroricon + '短信验证码不正确',
                maxlength: erroricon + '短信验证码不正确',
                vcode:     erroricon + '短信验证码不正确'
            },
            sfzh:{
                required:  erroricon + '证件号码不能为空'
            }
        },
        errorElement: "span",
        errorClass: "errorInfo",
        highlight : function(element) {  
            $(element).parents('td').addClass('has-error');  
        },  

        success : function(label) {  
            var $this = label;
            $this.siblings('.errorInfo').remove();
            $this.removeClass('has-error');  
            $this.remove();
        },  

        errorPlacement : function(error, element) { 
            var $td = element.parents('td');
            $td.append(error);
        },  

        submitHandler : function(form) {  
            $(form).find(":submit").attr("disabled", true).attr("value", "提交中"); 
            form.submit();
        }
    });
}
$.validator.addMethod("mphone", function(value) {
    var regStr = /^((13\d{9})|(14\d{9})|(15\d{9})|(17[1|2|3|4|5|6|7|8|9]\d{8})|(18\d{9}))$/;
    return regStr.test(value);
}, "手机号码格式不正确，暂不支持170号段");

$.validator.addMethod("vcode", function(value, element, param) {
    var validateNumber_v = $('#vcode').val();
    if (validateNumber_v.length != 6) {
        return false;
    }
    return true;
}, "短信验证码不正确");
