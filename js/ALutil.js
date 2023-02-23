function formValidation(){
    var form = $("#frmReviewAdd");
    form.validate({
        rules:{
            txtBusinessNameAdd:{
                required: true,
                rangelength: [2,20]
            },
            txtEmailAdd:{
                required: true,
                email: true
            },
            txtDateAdd:{
                required: true,
            },
            txtFoodRatingAdd:{
                required: function () {
                    return document.getElementById("ratingCheckbox").checked;
                },
                range: [0,5]
            },
            txtServiceRatingAdd:{
                required: function () {
                    return document.getElementById("ratingCheckbox").checked;
                },
                range: [0,5]
            },
            txtValueRatingAdd:{
                required: function () {
                    return document.getElementById("ratingCheckbox").checked;
                },
                range: [0,5]
            }
        },
        messages:{
            txtBusinessNameAdd:{
                required: "Business name is required",
                minlength: "Your name must be at least 2 char long"
            },
            txtEmailAdd:{
                required: "Email is required",
                email: "Invalid email address"
            },
            txtDateAdd:{
                required: "Date is required"
            },
            txtFoodRatingAdd:{
                required: "Food rating required",
                range: "Must be between 0-5"
            },
            txtServiceRatingAdd:{
                required: "Service rating required",
                range: "Must be between 0-5"
            },
            txtValueRatingAdd:{
                required: "Value rating required",
                range: "Must be between 0-5"
            }
        }
    });


    return form.valid();
}

function formValidationUpdate(){
    var form = $("#frmReviewUpdate");
    form.validate({
        rules:{
            txtBusinessNameAdd:{
                required: true,
                rangelength: [2,20]
            },
            txtEmailAdd:{
                required: true,
                email: true
            },
            txtDateAdd:{
                required: true,
            },
            txtFoodRatingAdd:{
                required: function () {
                    return document.getElementById("ratingCheckbox").checked;
                },
                range: [0,5]
            },
            txtServiceRatingAdd:{
                required: function () {
                    return document.getElementById("ratingCheckbox").checked;
                },
                range: [0,5]
            },
            txtValueRatingAdd:{
                required: function () {
                    return document.getElementById("ratingCheckbox").checked;
                },
                range: [0,5]
            }
        },
        messages:{
            txtBusinessNameAdd:{
                required: "Business name is required",
                minlength: "Your name must be at least 2 char long"
            },
            txtEmailAdd:{
                required: "Email is required",
                email: "Invalid email address"
            },
            txtDateAdd:{
                required: "Date is required"
            },
            txtFoodRatingAdd:{
                required: "Food rating required",
                range: "Must be between 0-5"
            },
            txtServiceRatingAdd:{
                required: "Service rating required",
                range: "Must be between 0-5"
            },
            txtValueRatingAdd:{
                required: "Value rating required",
                range: "Must be between 0-5"
            }
        }
    });


    return form.valid();
}