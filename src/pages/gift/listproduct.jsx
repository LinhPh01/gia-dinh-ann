import React, { useState, useEffect } from "react";
import { Box, Text, Sheet } from "zmp-ui";
import Ann from "../../../assets-src/Ann.svg";
import { useRecoilState } from "recoil";
import { ranksState } from "../../state";

// list sản phẩm trong phần ưu đãi
const Listproduct = () => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [listInvest, setListInvest] = useState([]);
  const [pointtotal, setPointTotal] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [ranks, setRanks] = useRecoilState(ranksState);
  const [ranksp, setRankSP] = useState();

  useEffect(() => {
    // Lấy dữ liệu điểm từ localStorage khi component được mount
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData && storedUserData.pointTotal !== undefined) {
      setPointTotal(storedUserData.pointTotal);
    } else {
      setPointTotal(0); // Hoặc null nếu bạn muốn không hiển thị điểm
      console.log("Không có dữ liệu người dùng trong localStorage.");
    }
  }, []);
  //api danh sách Listinvest

  useEffect(() => {
    const fetchListInvert = async () => {
      try {
        // Khởi động cả hai API cùng lúc để giảm thời gian chờ
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

        // Kiểm tra phản hồi của cả hai API
        if (!listInvestResponse.ok || !rankResponse.ok) {
          console.error(
            `HTTP error! status: ${
              !listInvestResponse.ok
                ? listInvestResponse.status
                : rankResponse.status
            }`
          );
          return;
        }

        const listInvestData = await listInvestResponse.json();
        const rankData = await rankResponse.json();

        console.log("Dữ liệu danh sách đầu tư:", listInvestData.data);
        console.log("Dữ liệu rank:", rankData.data);

        const updatedListInvest = listInvestData.data.map((item) => {
          const rank = rankData.data.find(
            (rankItem) => parseInt(item.rate_id, 10) === rankItem.id
          );

          return {
            ...item,
            rankName: rank ? rank.name : "Không có danh hiệu",
          };
        });

        // Cập nhật trạng thái với dữ liệu đã xử lý
        setListInvest(updatedListInvest);
        setRankSP(rankData.data);

        console.log("Danh sách đầu tư đã cập nhật:", updatedListInvest);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
    //phần chứa điểm
    <Box className="bg-page-color" pb={4}>
      <div className="px-4 py-4">
        <div className="rounded-2xl shadow-md bg-white py-2">
          <Box flex alignItems="center" className="">
            <img className="h-14 py-2 px-3" src={Ann} alt="" />
            <Box>
              <Text.Title size="small">Số Ann hiện tại của bạn là</Text.Title>
              <Box
                flex
                flexDirection="row"
                alignContent="flex-end"
                className=" space-x-1"
              >
                <Text.Title className="text-custom-teal">
                  {pointtotal !== null ? pointtotal : "Chưa có dữ liệu"}
                </Text.Title>
                <Text bold size="large" className=" text-custom-teal">
                  Ann
                </Text>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      {/* Lấy ra Listinvert */}
      <Box>
        <div className="listinvest-container slideIn grid grid-cols-2 gap-4 px-4 py-2 pb-10">
          {listInvest.map((item, index) => (
            <Box
              key={index}
              mb={2}
              className="bg-white rounded-lg shadow-md"
              pb={4}
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
                    className="w-full h-full object-cover object-center rounded-lg bg-skeleton"
                  />
                </Box>
                <Text size="xSmall" className="fixed-two-lines">
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
                        size="xxxSmall"
                        className="text-white pb-2 h-8 py-2"
                      >
                        {item.point}
                      </Text>
                      <img className="h-8 py-2" src={Ann} alt="" />
                    </Box>
                  </div>
                </div>
                {/* Phần sheet */}

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
                    <Box pb={4}>
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
                              <Text size="xxSmall text-white">
                                Số lượng còn lại
                              </Text>
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
                            - Đạt đủ số điểm cần đổi và số lượng còn lại không
                            được dưới 0.
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
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default Listproduct;
