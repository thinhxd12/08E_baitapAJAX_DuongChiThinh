function Validation() {
    this.kiemTraRong = function (value, selectorError, name) {
        //Xử lý không hợp lệ
        //.trim(): loại bỏ khoảng trắng đầu và cuối chuỗi
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        //Xử lý hợp lệ
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraKyTu = function (value, selectorError, name) {
        var regexAllLetter = /^[A-Z a-z]+$/;
        //Xử lý hợp lệ
        if (regexAllLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }

        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự!';
        return false;
    }
    this.kiemTraDoDai = function (value, minValue, maxValue, selectorError, name) {
        if (minValue > value.length || value.length > maxValue) {
            document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} đến ${maxValue} ký tự`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraGiaTri = function (value, minVal, maxVal, selectorError, name) {
        if (minVal > value || value > maxVal) {
            document.querySelector(selectorError).innerHTML = `${name} từ ${minVal} đến ${maxVal}`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}