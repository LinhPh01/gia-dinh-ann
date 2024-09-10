import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Box, Text, Sheet } from "zmp-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import Ann from "../../assets-src/Ann.svg";
import { useRecoilState } from "recoil";
import { ranksState } from "../state";

// slide các sản phẩm tối đa 10 sản phẩm hiển thị
const Swipermedicin = () => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [listInvest, setListInvest] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [ranks, setRanks] = useRecoilState(ranksState);
  const [pointSP, setPointSP] = useState([]);

  //api danh sách Listinvest

  useEffect(() => {
    const fetchListInvert = async () => {
      try {
        // Khởi động cả hai API song song
        const [listInvestResponse, rankResponse] = await Promise.all([
          fetch(
            "https://miniapp.nhathuocnaman.com/api/getListInvest?api_key=8AF1apnMW2A39Ip7LUFtNstE5RjYleSf",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          ),
          fetch(
            "https://miniapp.nhathuocnaman.com/api/getListRate?api_key=8AF1apnMW2A39Ip7LUFtNstE5RjYleSf",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          ),
        ]);

        // Kiểm tra phản hồi
        if (!listInvestResponse.ok || !rankResponse.ok) {
          throw new Error(
            `HTTP error! status: ${
              !listInvestResponse.ok
                ? listInvestResponse.status
                : rankResponse.status
            }`
          );
        }

        const listInvestData = await listInvestResponse.json();
        const rankData = await rankResponse.json();

        if (!listInvestData.data || !rankData.data) {
          console.log("Không nhận được dữ liệu từ API.");
          return;
        }

        // Lọc dữ liệu danh sách đầu tư
        const filteredData = listInvestData.data.slice(0, 10);

        // Kết hợp danh sách đầu tư với xếp hạng
        const rankMap = new Map(
          rankData.data.map((rankItem) => [rankItem.id, rankItem.name])
        );
        const updatedListInvest = filteredData.map((item) => ({
          ...item,
          rankName:
            rankMap.get(parseInt(item.rate_id, 10)) || "Không có danh hiệu",
          point: item.point,
        }));

        setListInvest(updatedListInvest);
        // setRankSP(rankData.data); // Lưu danh sách xếp hạng nếu cần
        setPointSP(updatedListInvest.map((item) => item.point));

        console.log(
          "Dữ liệu danh sách đầu tư với xếp hạng đã cập nhật:",
          updatedListInvest
        );
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };

    // Chỉ gọi API nếu cần và đặt lịch gọi lại nếu cần
    if (ranks) {
      fetchListInvert();
      const intervalId = setInterval(fetchListInvert, 60000); // Fetch every 60 seconds

      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }
  }, [ranks]);

  // console.log("ds", listInvest);

  const handleOpenSheet = (item) => {
    setSelectedItem(item);
    setSheetVisible(true);
  };

  const handleCloseSheet = () => {
    setSheetVisible(false);
    console.log("Sheet đã đóng");
  };

  return (
    <Box className="bg-page-color" pb={2}>
      <div className="px-4 ">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: null,
          }}
          slidesPerView={2.4}
          spaceBetween={0}
          className="px-4 swiper-container"
          direction="horizontal"
        >
          {listInvest.map((item, index) => (
            <SwiperSlide>
              <Box
                key={index}
                flex
                alignItems="center"
                justifyContent="center"
                onClick={() => {
                  handleOpenSheet(item);
                }}
                className="bg-white rounded-lg shadow-md image-container"
              >
                <div className="px-2 pt-2 space-y-2">
                  <Box
                    className="aspect-square relative"
                    onClick={() => {
                      handleOpenSheet(item);
                    }}
                  >
                    <img
                      loading="lazy"
                      src={`https://miniapp.nhathuocnaman.com/${item.avatar}`}
                      alt=""
                      className="image"
                    />
                  </Box>
                  <Text size="xxSmall" className="fixed-two-lines">
                    {item.name}
                  </Text>
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <div className="px-2 rounded-lg zui-box-custom-bg">
                      <div className="text-white h-8 py-2 flex items-center justify-center">
                        <Text
                          key={index}
                          bold
                          size="xxxxSmall"
                          className="text-center"
                        >
                          {item.rankName}
                        </Text>
                      </div>
                    </div>
                    <div
                      className="px-4 rounded-lg"
                      style={{ backgroundColor: "#0cb2ac" }}
                    >
                      <Box
                        className="rounded-3xl space-x-1"
                        flex
                        alignItems="center"
                        justifyContent="center"
                        variant="secondary"
                        fullWidth
                        onClick={() => {
                          handleOpenSheet(item);
                        }}
                      >
                        <Text
                          bold
                          size="xxSmall"
                          className="text-white pb-2 h-8 py-2"
                        >
                          {item.point}
                        </Text>
                        <img className="h-8 py-2" src={Ann} alt="" />
                      </Box>
                    </div>
                  </div>
                </div>
              </Box>

              {/* Phần Swiper*/}
            </SwiperSlide>
          ))}
        </Swiper>
        {selectedItem && (
          <Sheet
            visible={sheetVisible}
            onClose={handleCloseSheet}
            height={700}
            mask
            maskClosable
            handler
            swipeToClose
            style={{ overflowY: "auto" }}
          >
            <Box pb={4} className="zalo-mini">
              <Box
                p={8}
                className="custom-bottom-sheet"
                flex
                flexDirection="column"
                style={{ overflowY: "auto" }}
              >
                <Box className="bottom-sheet-cover">
                  <img
                    alt=""
                    src={`https://miniapp.nhathuocnaman.com/${selectedItem.avatar}`}
                    className="w-full h-full"
                  />
                </Box>
                <div className="zui-bg-sheet rounded-2xl p-4">
                  <div className="flex flex-cols-2 items-center justify-between">
                    <Box>
                      <Text size="xxSmall text-white">Quy đổi với</Text>
                    </Box>
                    <Box>
                      <Text size="xxSmall text-white">Số lượng còn lại</Text>
                    </Box>
                  </div>
                  <div className="flex flex-cols-2 items-center justify-between">
                    <Box>
                      <Text size="large text-white">
                        {selectedItem.point} Ann
                      </Text>
                    </Box>
                    <Box className="bottom-sheet-cover">
                      <Text.Title size="large text-white">
                        {selectedItem.quantity}
                      </Text.Title>
                    </Box>
                  </div>
                </div>
                <Box my={2}>
                  <Text.Title>Chi tiết quà tặng</Text.Title>
                </Box>
                <Box>
                  <Text>{selectedItem.content}</Text>
                </Box>
                <Box my={2}>
                  <Text.Title>Điều Kiện áp dụng</Text.Title>
                </Box>
                <Box>
                  <Text>
                    - Đạt đủ số điểm cần đổi và số lượng còn lại không được dưới
                    0.
                  </Text>
                  <Text>- Bậc hạng càng cao quà càng hấp dẫn.</Text>
                </Box>
              </Box>
              <Box
                pb={4}
                flex
                flexDirection="column"
                justifyContent="between"
                style={{ backgroundColor: "#0cb2ac" }}
                className="rounded-t-xl"
              >
                <div className="flex flex-row items-center justify-between p-4 px-4">
                  <Box>
                    <Text.Title size="large text-white">
                      Để đổi quà tặng!
                    </Text.Title>
                    <Text size="xxSmall text-white">
                      Hãy đến cửa hàng gần nhất
                    </Text>
                  </Box>
                  <img src={Ann} alt="" />
                </div>
              </Box>
            </Box>
          </Sheet>
        )}
      </div>
    </Box>
  );
};

export default Swipermedicin;
