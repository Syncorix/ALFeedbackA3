function showRatingTextboxs() {
    if(document.getElementById("ratingCheckbox").checked === true){
        $("#ratingInputs").show();
    } else {
        $("#ratingInputs").hide();
    }
}

function showRatingUpdateTextboxs() {
    if(document.getElementById("ratingCheckboxUpdate").checked === true){
        $("#ratingInputsUpdate").show();
    } else {
        $("#ratingInputsUpdate").hide();
    }
}

function ratingCalculation() {
    var foodRating = $("#txtFoodRatingAdd").val();
    var serviceRating = $("#txtServiceRatingAdd").val();
    var valueRating = $("#txtValueRatingAdd").val();

    var overallRating = (parseInt(foodRating) + parseInt(serviceRating) + parseInt(valueRating)) * 100 / 15

    $("#txtRatingAdd").val(overallRating.toFixed() + "%");
}

function ratingCalculationUpdate() {
    var foodRating = $("#txtFoodRatingUpdate").val();
    var serviceRating = $("#txtServiceRatingUpdate").val();
    var valueRating = $("#txtValueRatingUpdate").val();

    var overallRating = (parseInt(foodRating) + parseInt(serviceRating) + parseInt(valueRating)) * 100 / 15

    $("#txtRatingUpdate").val(overallRating.toFixed() + "%");
}

function addFeedback() {
    if (formValidation()) {
        console.log("Add form is valid");
        var options = [];

        var businessName = $("#txtBusinessNameAdd").val();
        var type = $("#txtTypeAdd").val();
        var email = $("#txtEmailAdd").val();
        var comments = $("#txtCommentsAdd").val();
        var date = $("#txtDateAdd").val();
        var ratingCheckbox = $("#ratingCheckbox").prop("checked");

        if(ratingCheckbox === true) {
            var rating1 = $("#txtFoodRatingAdd").val();
            var rating2 = $("#txtServiceRatingAdd").val();
            var rating3 = $("#txtValueRatingAdd").val();

            options = [businessName, type, email, comments, date, ratingCheckbox, rating1, rating2, rating3];

        }
        else {
            options = [businessName, type, email, comments, date, ratingCheckbox, 0, 0, 0];
        }

        function callback(){
            console.info("Success: record inserted successfully");
            alert("New Feedback Added");
        }
        Review.insert(options, callback);

    }
    else {
        console.log('Add form is invalid');
    }
}

function updateFeedback() {
    if (formValidation()) {
        console.log("Add form is valid");
        var id = localStorage.getItem('id');
        var options = [];

        var businessName = $("#txtBusinessNameUpdate").val();
        var type = $("#txtTypeUpdate").val();
        var email = $("#txtEmailUpdate").val();
        var comments = $("#txtCommentsUpdate").val();
        var date = $("#txtDateUpdate").val();
        var ratingCheckbox = $("#ratingCheckboxUpdate").prop("checked");

        if(ratingCheckbox === true) {
            var rating1 = $("#txtFoodRatingUpdate").val();
            var rating2 = $("#txtServiceRatingUpdate").val();
            var rating3 = $("#txtValueRatingUpdate").val();

            options = [businessName, type, email, comments, date, ratingCheckbox, rating1, rating2, rating3, id];

        }
        else {
            options = [businessName, type, email, comments, date, ratingCheckbox, 0, 0, 0, id];
        }
        // for (var i = 0; i < options.length; i++){
        //     console.log(options[i]);
        // }

        function callback() {
            console.info("Record updated successfully");
            alert("Feedback Updated Successfully");
        }

        Review.update(options, callback);
    }
    else {
        console.log('Add form is invalid');
    }
}

function saveEmail() {
    localStorage.setItem("DefaultEmail", $("#txtDefaultEmail").val());
    alert("Default reviewer email saved");
}

function loadValues() {
    $("#txtBusinessNameAdd").val("");
    $("#txtEmailAdd").val(localStorage.getItem("DefaultEmail"));
    $("#txtCommentsAdd").val("");
    $("#txtDateUpdate").val("");
    $("#ratingCheckbox").prop("checked", false);
    $("#txtFoodRatingAdd").val(0);
    $("#txtServiceRatingAdd").val(0);
    $("#txtValueRatingAdd").val(0);
    $("#txtRatingAdd").val("");

    $("#frmReviewAdd :checkbox").checkboxradio("refresh");
    showRatingTextboxs();
    console.log("Email Loaded");
}

function updateTypesDropdown() {
    var options =[];
    var htmlCode = "";

    function callback(tx, results) {
        console.info("Success: Records selected successfully");

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            console.info(`id: ${row['id']} name: ${row['name']}`);

            if(i === 0) {
                htmlCode += `<Option value=${row['id']}>${row['name']}</Option>`;
            }
            else {
                htmlCode += `<Option value=${row['id']}>${row['name']}</Option>`;
            }

        }
        var typeList = $("#txtTypeAdd");
        typeList = typeList.html(htmlCode);
        typeList.selectmenu("refresh", true);
    }

    Type.selectAll(options, callback);
}

function updateTypesDropdownModify() {
    var options =[];
    var htmlCode = "";

    function callback(tx, results) {
        console.info("Success: Records selected successfully");

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            console.info(`id: ${row['id']} name: ${row['name']}`);

            if(i === 0) {
                htmlCode += `<Option value=${row['id']}>${row['name']}</Option>`;
            }
            else {
                htmlCode += `<Option value=${row['id']}>${row['name']}</Option>`;
            }

        }
        var typeList = $("#txtTypeUpdate");
        typeList = typeList.html(htmlCode);
    }

    Type.selectAll(options, callback);
}

function getReviews() {
    var options =[];
    var htmlCode = "";
    function callback(tx, results) {
        console.info("Success: Records selected successfully");

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            var overallRating = ((row['rating1'] + row['rating2'] + row['rating3']) / 15) * 100;
            htmlCode += `<li><a data-role="button" data-row-id=${row['id']} href="#">
            Business Name: ${row['businessName']}
            <p>Reviewer Email: ${row['reviewerEmail']}</p>
            <p>Comments: ${row['reviewerComments']}</p>
            <p>Overall Rating: ${overallRating.toFixed()}%</p>
            </a></li>`;

        }
        var lv = $("#ReviewList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#ALModifyFeedbackPage');
        }

        $("#ReviewList a").on("click", clickHandler);
    }

    Review.selectAll(options, callback);
}

function showCurrentReview() {
    var id = localStorage.getItem('id');

    var options =[id];
    function callback(tx, results) {
        console.info("Success: Record selected successfully");
        var row = results.rows[0];
        var overallRating = ((row['rating1'] + row['rating2'] + row['rating3']) / 15) * 100;

        $("#txtBusinessNameUpdate").val(row['businessName']);
        $("#txtEmailUpdate").val(row['reviewerEmail']);
        $("#txtTypeUpdate").val(row['typeId']);
        $("#txtCommentsUpdate").val(row['reviewerComments']);
        $("#txtDateUpdate").val(row['reviewDate']);
        if (row['hasRating'] === 'true') {
            $("#ratingCheckboxUpdate").prop("checked", true);
            $("#txtFoodRatingUpdate").val(row['rating1']);
            $("#txtServiceRatingUpdate").val(row['rating2']);
            $("#txtValueRatingUpdate").val(row['rating3']);
            $("#txtRatingUpdate").val(overallRating.toFixed() + '%');
        }
        else{
            $("#ratingCheckboxUpdate").prop("checked", false);
            $("#txtFoodRatingUpdate").val(0);
            $("#txtServiceRatingUpdate").val(0);
            $("#txtValueRatingUpdate").val(0);
        }
        $("#frmReviewUpdate :checkbox").checkboxradio("refresh");
        $("#txtTypeUpdate").selectmenu("refresh", true);

        showRatingUpdateTextboxs();
    }

    Review.select(options, callback);
}

function deleteFeedback() {
    var id = localStorage.getItem('id');
    var options =[id];
    function callback() {
        console.info("Success: Record deleted successfully");
        alert("Feedback Deleted Successfully");
        location.href = $("ALViewFeedbackPage");
    }

    Review.delete(options, callback);
}

function clearDatabase() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared!");
        } catch (e) {
            alert(e);
        }
    }
}

