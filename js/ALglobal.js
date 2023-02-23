
function checkboxRating_click() {
    showRatingTextboxs();
}

function checkboxRatingUpdate_click() {
    showRatingUpdateTextboxs();
}

function ratingCalculation_click() {
    ratingCalculation();
}

function ratingCalculationUpdate_click() {
    ratingCalculationUpdate();
}

function ratingAdd_click() {
    addFeedback();
}

function ratingUpdate_click() {
    updateFeedback();
}

function saveEmail_click() {
    saveEmail();
}

function loadEmail_show() {
    initDB();
    loadValues();
    updateTypesDropdown();
}

function viewFeedback_show() {
    getReviews();
}

function loadReview() {
    initDB();
    updateTypesDropdownModify();
    showCurrentReview();
}

function ratingDelete_click() {
    deleteFeedback();
}

function clearDatabase_click() {
    clearDatabase();
}

function init() {
    $("#ratingCheckbox").on("click", checkboxRating_click);
    $("#txtFoodRatingAdd").on ("change", ratingCalculation_click);
    $("#txtServiceRatingAdd").on("change", ratingCalculation_click);
    $("#txtValueRatingAdd").on("change", ratingCalculation_click);
    $("#btnAdd").on("click", ratingAdd_click);

    $("#ratingCheckboxUpdate").on("click", checkboxRatingUpdate_click);
    $("#txtFoodRatingUpdate").on ("change", ratingCalculationUpdate_click);
    $("#txtServiceRatingUpdate").on("change", ratingCalculationUpdate_click);
    $("#txtValueRatingUpdate").on("change", ratingCalculationUpdate_click);
    $("#btnUpdate").on("click", ratingUpdate_click);
    $("#btnDelete").on("click", ratingDelete_click);

    $("#btnSaveDefaults").on("click", saveEmail_click)
    $("#btnClearDatabase").on("click", clearDatabase_click)

    $("#ALAddFeedbackPage").on("pageshow", loadEmail_show);
    $("#ALViewFeedbackPage").on("pageshow", viewFeedback_show);
    $("#ALModifyFeedbackPage").on("pageshow", loadReview);

}

function initDB(){
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating tables..");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Dababase does not exists");
        }
    }catch(e){
        console.error("Error: (Fatal)  Error in initDB(). can not proceed" );
    }
}

$(document).ready(function () {
    init();
    initDB();
});