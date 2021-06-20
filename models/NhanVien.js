function NhanVien() {
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.chucVu = '';
    this.heSoChucVu = '';
    this.luongCoBan = '';
    this.soGioLamTrongThang = '';
    this.tinhTongLuong = function () {
        return Number(this.luongCoBan) * Number(this.heSoChucVu);
    }
    this.xepLoaiNhanVien = function () {
        var xepLoai = '';
        if (this.soGioLamTrongThang > 120) {
            xepLoai = 'Nhân viên xuất sắc';
        }
        else if (this.soGioLamTrongThang > 100 && this.soGioLamTrongThang <= 120) {
            xepLoai = 'Nhân viên giỏi';
        }
        else if (this.soGioLamTrongThang > 80 && this.soGioLamTrongThang <= 100) {
            xepLoai = 'Nhân viên trung khá';
        }
        else if (this.soGioLamTrongThang > 50 && this.soGioLamTrongThang <= 80) {
            xepLoai = 'Nhân viên trung bình';
        }
        return xepLoai;
    }
}