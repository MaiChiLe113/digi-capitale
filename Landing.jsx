import { Box, Button, Container, Stack, Typography, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Stack>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          color: "white",
          padding: 4,
          backgroundImage: `url("https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/vinhomes%20-d'capitale.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            background: `rgba(0, 0, 0, 0.3)`,
            backdropFilter: "blur(3px)",
          },
          "& > *": {
            position: "relative",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h1" color="primary">
            Welcome to D'Capitale
          </Typography>
          <Typography variant="h5" color="primary.contrastText">
            Where Prime Location Meets Perfect Connection
          </Typography>
          <Button variant="containedPrimary" component={Link} to="/about">
            Find out more
          </Button>
        </Box>
      </Box>
      {/* D’Capitale Overview & Incentives */}
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#f1faffff",
          width: "70%",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4" color="red" gutterBottom>
            🏙️ Dự án D’Capitale Trần Duy Hưng
          </Typography>
          <Typography variant="h4" color="blue" gutterBottom>
            Vị trí kim cương, tinh hoa hội tụ
          </Typography>
          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/vinhomes%20-d'capitale.jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
        </Box>

        <Typography variant="body1">
          D’.Capitale là tổ hợp căn hộ cao cấp, officetel và trung tâm thương
          mại tọa lạc tại vị trí đắc địa – ngã tư Trần Duy Hưng và Hoàng Minh
          Giám, quận Cầu Giấy, Hà Nội. Dự án là sự kết hợp giữa Tập đoàn Tân
          Hoàng Minh và Vingroup, được quản lý vận hành bởi Vinhomes – thương
          hiệu bất động sản hàng đầu Việt Nam.
        </Typography>

        <Typography variant="body1">
          Với quy mô 6 tòa căn hộ cao từ 39 đến 46 tầng, D’.Capitale cung cấp
          hơn 3.000 căn hộ hiện đại, diện tích từ 50–120 m², phù hợp với nhiều
          nhu cầu: an cư, đầu tư, cho thuê. Dự án sở hữu hệ thống tiện ích đẳng
          cấp như hồ cảnh quan, skybar, sân thể thao, gym ngoài trời, khu BBQ,
          bể bơi bốn mùa, trung tâm thương mại Vincom và trường học Vinschool.
        </Typography>

        <Box sx={{ mt: 4, mb: 2, textAlign: "center" }}>
          <Typography variant="h5" color="blue" gutterBottom>
            Chính sách ưu đãi hấp dẫn
          </Typography>
          <Typography variant="h5" color="blue" gutterBottom>
            💥 Chỉ duy nhất dành cho tháng này 💥
          </Typography>
        </Box>
        <ul>
          <li>💥 Chiết khấu 15% cho khách hàng thanh toán sớm</li>
          <li>💥 Tặng gói nội thất tương đương 10% giá trị căn hộ</li>
          <li>
            💥 Hỗ trợ vay 65% giá trị căn hộ với lãi suất 0% trong 24 tháng
          </li>
          <li>💥 Chiết khấu 8% cho khách hàng thanh toán theo tiến độ</li>
          <li>💥 Khách hàng được lên xem trực tiếp căn hộ</li>
          <li>💥 Tặng 10 năm phí dịch vụ (hoặc trừ trực tiếp vào giá bán)</li>
          <li>💥 Căn hộ 1PN: chiết khấu 70 triệu đồng</li>
          <li>💥 Căn hộ 2PN: chiết khấu 120 triệu đồng</li>
          <li>💥 Căn hộ 3PN: chiết khấu 170 triệu đồng</li>
          <li>
            💥 Tặng gói tân gia trị giá 150 triệu đồng (trừ vào giá trị trước
            VAT + phí bảo trì)
          </li>
        </ul>

        <Typography variant="body1" sx={{ my: 2 }}>
          Đây là cơ hội tốt nhất để sở hữu căn hộ tại D’.Capitale Trần Duy Hưng
          với mức giá ưu đãi chưa từng có. Gọi ngay hotline{" "}
          <strong style={{ color: "blue" }}>0987606780</strong> hoặc để lại
          thông tin để được tư vấn chi tiết!
        </Typography>

        <Box
          sx={{
            lineHeight: "2",
            my: "4",
          }}
        >
          <Typography
            variant="h4"
            color="blue"
            textAlign={"center"}
            m={"4"}
            gutterBottom
          >
            TỔNG QUAN D'CAPITALE TRẦN DUY HƯNG
          </Typography>

          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/bg_content.png"
              alt=""
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={11} sm={6}>
              <Box sx={{ p: "2" }}>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>Tên dự án:</strong>
                  D'.Capitale
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>Vị trí:</strong> Trần Duy
                  Hưng, Trung Hòa, Cầu Giấy, Hà Nội
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>Chủ đầu tư:</strong> Tập
                  đoàn Tân Hoàng Minh Group
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>
                    Phân phối và vận hành quản lý::
                  </strong>{" "}
                  Vinhomes (Tập đoàn Vingroup)
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>
                    Bảo trợ vốn & Bảo lãnh tiến độ:
                  </strong>{" "}
                  Ngân hàng Techcombank
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>Đơn vị thi công:</strong>{" "}
                  Delta & Cotecons
                </Typography>

                <Typography py={1}>
                  <strong style={{ color: "blue" }}>
                    Tổng diện tích đất dự án:
                  </strong>{" "}
                  50.309 m²
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>Mật độ xây dựng:</strong>{" "}
                  29,8%
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>
                    Loại hình phát triển:
                  </strong>{" "}
                  Căn hộ chung cư - Soho D'.Capitale
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>Dự án bao gồm:</strong> 4
                  tòa căn hộ cao cấp và 2 tòa Soho
                </Typography>
                <Typography py={1}>
                  <strong style={{ color: "blue" }}>Tổng số:</strong>
                  3.000 căn
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="blue"
            m={"4"}
            textAlign={"center"}
          >
            VỊ TRÍ D'CAPITALE TRẦN DUY HƯNG
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/bg_content.png"
              alt=""
            />
          </Box>

          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/vi-tri-vinhomes-tran-duy-hung.jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
          <Typography variant="body1" lineHeight={2}>
            <strong style={{ color: "blue" }}>
              Chung cư cao cấp D'.Capitale
            </strong>{" "}
            tọa lạc ngay giữa trung tâm hành chính - văn hóa - kinh tế - giáo
            dục của thủ đô Hà Nội. Theo chủ đầu tư, đây là các yếu tố đảm bảo{" "}
            <strong style={{ color: "blue" }}>
              {" "}
              tiềm năng tăng trưởng giá trị của Dự án D’.Capitale trong tương
              lai
            </strong>
            . <br />
            Chung cư cao cấp Trần Duy Hưng sở hữu vị trí đẹp, đắc địa: <br />♦
            Thuận lợi giao thông với vị trí 2 mặt tiền, ngã tư giao tại Trần Duy
            Hưng, Khuất Duy Tiến, Phạm Hùng, Đường vành đai 3. <br />♦ Cách
            Trung tâm thương mại và Giải trí Big C Thăng Long 100m, cách Trung
            tâm hội nghị quốc gia 200m. <br />♦ Các hệ thống trường học liên cấp
            quốc tế đẳng cấp : THPT Amsterdam, THPT Lương Thế Vinh, Đại học Hà
            Nội, Các trường đại học lớn.
          </Typography>
        </Box>

        <Box
          sx={{
            padding: 2,
            margin: "2",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="blue"
            m={"4"}
            textAlign={"center"}
          >
            MẶT BẰNG D'CAPITALE TRẦN DUY HƯNG
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/bg_content.png"
              alt=""
            />
          </Box>

          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/12.jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
          <Typography variant="h5" color="blue">
            1. Tổng quan Tòa Tháp C1- căn hộ chung cư cao cấp Trần Duy Hưng
          </Typography>
          <Typography px={2}>
            <strong>C1 D'capiatale Trần Duy Hưng</strong> có một vị trí siêu đắc
            địa.
          </Typography>
          <ul>
            <li>Chiều cao của tòa tháp: 39 tầng</li>
            <li>Mật độ: 11 căn/sàn</li>
            <li>Loại căn hộ: 01 - 03 phòng ngủ</li>
            <li>Loại diện tích: 57m2 - 100m2</li>
            <li>Loại hình phát triển: Căn hộ & Shophouse</li>
          </ul>

          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/m%E1%BA%B7t-b%E1%BA%B1ng-t%C3%B2a-C1.jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
          <Typography variant="h5" color="blue">
            2. Tòa C2 là tòa căn hộ SOHO – Officetel – Công năng sử dụng 3 trong
            1: Sống – làm việc – hưởng thụ
          </Typography>
          <Typography px={2}>
            <strong>Tòa C2 chung cư cao cấp Trần Duy Hưng</strong> là tòa nhà
            được dựng theo mô hình Officetel đầu tiên.
          </Typography>
          <Typography px={2}>
            Đây là mô hình sản phẩm SOHO vô cùng đẳng cấp.
          </Typography>
          <ul>
            <li>Chiều cao: cao 45 tầng</li>
            <li>Số lượng căn hộ/sàn: 22 Căn/sàn</li>
            <li>Căn Studio: 10 căn/ sàn 37,54 – 38,47m2</li>
            <li>
              Diện tích xây dựng: 1298,4m2, 2 Tầng hầm và 1 tầng Thương Mại
            </li>
            <li>Số lượng thang máy /sàn: 8 thang.</li>
          </ul>

          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/mat-bang-c2.jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
          <Typography variant="h5" color="blue">
            3. Tòa tháp C3
          </Typography>
          <Typography px={2}>
            <strong>Tòa C3 D’chung cư cao cấp Trần Duy Hưng</strong> sở hữu
            không gian xung quanh thoáng đạt với 3 mặt tiền đắc địa.
          </Typography>
          <ul>
            <li>Chiều cao:41 tầng</li>
            <li>Mật độ:12 căn/sàn</li>
            <li>Loại căn hộ:02 - 03 phòng ngủ</li>
            <li>Diện tích căn hộ:70m2 - 120m2</li>
          </ul>

          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/Mb-c3-L2-12b.jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />

          <Typography variant="h5" color="blue">
            4. Tòa tháp C5
          </Typography>

          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/mat-bang-thiet-ke-toa-soho-c5.jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
          <Typography variant="h5" color="blue">
            5. Tòa Tháp C6
          </Typography>
          <Typography px={2}>
            Tòa C6 D’Capitale sở hữu mặt tiền thoáng đạt ngay sát trục đường
            Trần Duy Hưng sầm uất, nhộn nhịp.
          </Typography>
          <ul>
            <li>Chiều cao: 42 tầng</li>
            <li>Loại căn hộ: 02 - 03 phòng ngủ</li>
            <li>Diện tích: 70 - 111m2</li>
            <li>
              Loại hình phát triển: Căn hộ & TTTM, Shop thương mại, dịch vụ.
            </li>
          </ul>

          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/mat-bang-c6.jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
          <Typography variant="h5" color="blue">
            6. Tòa Tháp C7
          </Typography>
          <Typography px={2}>
            <strong>Tòa C7 D'capiatale Trần Duy Hưng</strong> có vị trí đẹp bậc
            nhất dự án khi nằm ngay ngã tư với 2 mặt tiền đường Trần Duy Hưng và
            Hoàng Minh Giám.{" "}
          </Typography>
          <ul>
            <li>Số tầng: 42 tầng</li>
            <li>Mật độ: 12 căn/sàn</li>
            <li>Loại căn hộ: 2 - 3 phòng ngủ</li>
            <li>Loại diện tích: Từ 71m2 - 111m2</li>
            <li>Số lượng thang máy: 7 thang/sàn</li>
          </ul>
        </Box>

        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="blue"
            m={"4"}
            textAlign={"center"}
          >
            NỘI THẤT D'CAPITALE
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/bg_content.png"
              alt=""
            />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/38.jpg"
              alt="D’Capitale Trần Duy Hưng"
              style={{ width: "100%" }}
            />
            <Typography color="blue">( phòng khách sang trọng )</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/40.jpg"
              alt="D’Capitale Trần Duy Hưng"
              style={{ width: "100%" }}
            />
            <Typography color="blue">( thiết kế hiện đại )</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/42.jpg"
              alt="D’Capitale Trần Duy Hưng"
              style={{ width: "100%" }}
            />
            <Typography color="blue">( Nội thất cao cấp)</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="blue"
            m={"4"}
            textAlign={"center"}
          >
            TIỆN ÍCH D’CAPITALE TRẦN DUY HƯNG
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/bg_content.png"
              alt=""
            />
          </Box>
          <Typography>
            <strong>VINHOMES D'CAPITALE </strong>có một hệ thống các tiện ích
            bậc nhất Việt Nam. Gồm có: <br /> Sân bóng rổ, Sân tennis, Sân chơi
            trẻ em, Đường chạy bộ, Khu tập gym ngoài trời, Sân bóng đá, Hồ cảnh
            quan, Quảng trường, Vườn BBQ, Sảnh lounge ngoài trời, Bể bơi trung
            tâm, Đảo thư giãn, Khu café ngoài trời, Khu vực đón khách, Khu tập
            yoga, thiền, Không gian tổ chức sự kiện, Hàng rào cây xanh,
            Skybar...
          </Typography>
          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/3(2).jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
          <Typography>
            Với Vinhomes, cư dân{" "}
            <strong style={{ color: "blue" }}>D’.Capitale</strong> sẽ được trải
            nghiệm một môi trường sống lý tưởng, một cuộc sống hạnh phúc ngập
            tràn
          </Typography>
          <img
            src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/5(1).jpg"
            alt="D’Capitale Trần Duy Hưng"
            style={{ width: "100%" }}
          />
        </Box>
      </Box>
      {/* Service Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: 8,
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h3">Our Services</Typography>
          <Typography variant="body1">
            Discover the range of services we offer to enhance your living
            experience.
          </Typography>
          <Button variant="outlined" component={Link} to="/signin">
            Log In to Explore Services
          </Button>
        </Box>

        {/* Resident Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h3">Resident Dynamic Website</Typography>
          <Typography variant="body1">
            Access your personalized resident portal for exclusive features and
            updates.
          </Typography>
          <Button variant="outlined" component={Link} to="/signin">
            Log In to Resident Portal
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}

// ATTRACTIVE INCENTIVE POLICY

// 💥  Only for this month  💥

// 🎁  15% discount for customers who pay early

// 🎁  Free furniture package equivalent to 10% of apartment value

// 🎁  Support loan 65% of apartment value with 0% interest rate in 24 months

// 🎁  8% discount for customers paying on schedule

// 🎁  Customers can come and see the apartment directly

// ⇒  Free 10 years of service fees, if you do not receive service fees, they will be deducted directly from the selling price.

// 🎁  1 bedroom apartment: 70 million discount

// 🎁  2-bedroom apartment: 120 million discount

// 🎁  3-bedroom apartment: discount 170 million

// 🎁  Get a housewarming package worth 150 million, deducted from the value before VAT + maintenance fee

// This is the opportunity to buy D'capitale Tran Duy Hung apartment at the best price. What are you waiting for? Hurry up and buy now, call hotline 0987606780 or leave your information below.
