ajaxing=false;
$(function () {
    $(".form-box input").blur(function () {
        var _this = $(this);
        if(_this.is(".for_login"))
        {
            return true;
        }
        var name = _this.attr("name");
        var val = _this.val();
        var length = val.length;
        var message = "";
        switch (name) {
            case "username":
                var Initial = val.substring(0, 1);
                if (length == 0) {
                    message = "* Account can not be empty.";
                } else if (length < 4 || length > 16) {
                    message = "* Account is not formatted correctly!";
                } else if (!/^([a-z]){1,1}$/.test(Initial)) {
                    message = "* Account is not formatted correctly!";
                } else if (!(/^([a-z]|[_]){1}([a-z0-9]|[_\-]){4,16}$/.test(val))) {
                    message = "* Account is not formatted correctly!";
                } else {
                    type = "username";
                    message = "ok";
                }
                break;
            case "email":
                if (length == 0) {
                    message = "* Email address cannot be empty";
                } else {
                    if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val))) {
                        message = "* Incorrect email format";
                    } else {
                        type = "email";
                        message = "ok";
                    }
                }
                break;
            case "password":case "oldpassword":
            if (length == 0) {
                message = "* Password  cannot be empty";
            } else if (length < 4 || length > 16) {
                message = "* Password is not formatted correctly.";
            } else {
                message = "ok";
            }
            break;
            case "repassword":
                if (length == 0) {
                    message = "* Confirm Password can not be empty.";
                    //} else if (val != _this.parents('.form-box').find(".box-main input[name='password']").val()) {
                }else if (val != $("#modal-sign-up .form-box input[name='password']").val()){
                    message = "* The two passwords do not match.";
                } else {
                    message = "ok";
                }
                break;
            case "r_repassword":
                if (length == 0) {
                    message = "* Confirm Password can not be empty.";
                    //} else if (val != _this.parents('.form-box').find(".box-main input[name='password']").val()) {
                }else if (val != $("#modal-user-center .form-box input[name='password']").val()){
                    message = "* The two passwords do not match.";
                } else {
                    message = "ok";
                }
                break;
            case "captcha":
                message = "ok";
                break;
        }

        if (message == "load") {
            $.ajax({
                url: "##",
                data: {
                    field: type,
                    value: val
                },
                dataType: "jsonp",
                error: function () {
                    //alert("errors//");
                },
                success: function (data) {
                    if (data["status"] == 1) {
                        $(".input-prompt").html("");

                    } else if (data["status"] == 0) {
                        var msg = "";
                        for (var x in data["message"]) {
                            msg += data["message"][x][0];
                            break;
                        }
                        _this.find(".input-prompt").html(msg);
                    }
                }
            });

        } else if (message == "ok") {
            _this.removeClass('error');
            _this.parents('.form-box').find(".input-prompt").html("");

        } else {
            _this.addClass('error');
            _this.parents('.form-box').find(".input-prompt").html(message);
        }
    });
});

function formsubmit(o) {
    o.parents('.form-box').find("input[name='do']").val(1);
    o.parents('.form-box').submit();
}

