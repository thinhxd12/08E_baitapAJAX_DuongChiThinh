function renderTableNhanVien(arrNhanVien) {
    var content = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nv = arrNhanVien[index];
        var nhanVien = new NhanVien();
        nhanVien.maNhanVien = nv.maNhanVien;
        nhanVien.tenNhanVien = nv.tenNhanVien;
        nhanVien.chucVu = nv.chucVu;
        nhanVien.heSoChucVu = nv.heSoChucVu;
        nhanVien.luongCoBan = nv.luongCoBan;
        nhanVien.soGioLamTrongThang = nv.soGioLamTrongThang;

        var trNhanVien = `
        <tr class="tblNhanVien" onclick="layThongTinNhanVien('${nhanVien.maNhanVien}')">
        <td>${nhanVien.maNhanVien}</td>
        <td>${nhanVien.tenNhanVien}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.luongCoBan}</td>
        <td>${nhanVien.tinhTongLuong()}</td>
        <td>${nhanVien.soGioLamTrongThang}</td>
        <td>${nhanVien.xepLoaiNhanVien()}</td>
        <td><button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xoá</button></td>
        </tr>
        `;
        content += trNhanVien;
    }
    document.querySelector('#tblNhanVien').innerHTML = content;
}

LayDanhSachNhanVien();
function LayDanhSachNhanVien() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json'
    })
    promise.then(function (result) {
        // console.log('result', result.data);
        renderTableNhanVien(result.data);

    })
    promise.catch(function (error) {
        console.log('error', error);
    })

}

function xoaNhanVien(maNV) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNV}`,
        method: 'DELETE',
    })

    promise.then(function (result) {
        console.log('result', result.data);
        LayDanhSachNhanVien();
    })
    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
}


function kiemTraDuLieu(nhanVienKT) {
    var kiemTra = new Validation();
    var valid = true;
    valid &= kiemTra.kiemTraRong(nhanVienKT.maNhanVien, "#error_required_maNhanVien", "Mã nhân viên");
    valid &= kiemTra.kiemTraKyTu(nhanVienKT.tenNhanVien, "#error_allLetter_tenNhanVien", "Tên nhân viên");
    valid &= kiemTra.kiemTraDoDai(nhanVienKT.maNhanVien, 4, 6, "#error_min_max_length_maNhanVien", "Mã nhân viên");
    valid &= kiemTra.kiemTraGiaTri(nhanVienKT.luongCoBan, 1000000, 20000000, "#error_min_max_luongCoBan", "Lương cơ bản")
    valid &= kiemTra.kiemTraGiaTri(nhanVienKT.soGioLamTrongThang, 50, 150, "#error_min_max_soGioLamTrongThang", "Số giờ làm trong tháng từ")

    return valid;
}

document.querySelector('#btnThemNhanVien').onclick = function () {
    var nhanVien = new NhanVien();
    // var kiemTra = new Validation();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    //Lấy giá trị innerHTML của thẻ option được chọn từ thẻ select
    var slChucVu = document.querySelector('#chucVu');
    var viTriOptionChon = slChucVu.selectedIndex; //Lấy ra vị trí của thẻ option được chọn từ selec
    nhanVien.chucVu = slChucVu[viTriOptionChon].innerHTML;

    //Kiểm tra dữ liệu
    var valid = kiemTraDuLieu(nhanVien);
    if (!valid) {
        return;
    }

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien`,
        method: 'POST',
        data: nhanVien
    })

    promise.then(function (result) {
        console.log('result', result.data);
        LayDanhSachNhanVien();
    })
    promise.catch(function (error) {
        console.log('error', error.response.data);

    })
}

function layThongTinNhanVien(maNV) {

    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#btnThemNhanVien').disabled = true;

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNV}`,
        method: 'GET'
    })
    promise.then(function (result) {
        // console.log('result', result.data);
        var nhanVien = result.data;
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').selectedIndex = nhanVien.heSoChucVu - 1;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;
    })
    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
}

document.querySelector('#btnCapNhatThongTin').onclick = function () {
    var nhanVienCapNhat = new NhanVien();
    nhanVienCapNhat.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVienCapNhat.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVienCapNhat.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVienCapNhat.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVienCapNhat.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    //Lấy giá trị innerHTML của thẻ option được chọn từ thẻ select
    var slChucVu = document.querySelector('#chucVu');
    var viTriOptionChon = slChucVu.selectedIndex; //Lấy ra vị trí của thẻ option được chọn từ selec
    nhanVienCapNhat.chucVu = slChucVu[viTriOptionChon].innerHTML;

    //Kiểm tra dữ liệu
    var valid = kiemTraDuLieu(nhanVienCapNhat);
    if (!valid) {
        return;
    }

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVienCapNhat.maNhanVien}`,
        method: 'PUT',
        data: nhanVienCapNhat
    })
    promise.then(function (result) {
        console.log('result', result.data)
        LayDanhSachNhanVien();
        //Mở khoá nút
        document.querySelector('#maNhanVien').disabled = false;
        document.querySelector('#btnThemNhanVien').disabled = false;
    })
    promise.catch(function (error) {
        console.log('error', error.response.data)

    })
}

