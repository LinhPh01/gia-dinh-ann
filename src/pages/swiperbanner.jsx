import React, { useEffect, useState } from "react";
import { Box, Swiper, Text } from "zmp-ui";

// baner dạng slide
const Swiperbanner = () => {
  const [listSlider, setListSlider] = useState([]);
  useEffect(() => {
    const fetchListInvert = async () => {
      const response = await fetch(
        "https://miniapp.nhathuocnaman.com/api/getListSlider?api_key=8AF1apnMW2A39Ip7LUFtNstE5RjYleSf",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("data về :", data.data);

      if (data.data) {
        // const slicedData = data.data.slice(0, 10); // ràng buộc 10 sản phẩm
        setListSlider(data.data);
      } else {
        console.log("Không nhận được ID người dùng từ API.");
      }
    };

    fetchListInvert();
  }, []);
  return (
    <Box className="bg-page-color" pb={4}>
      <div>
        <div className="px-4">
          <Box>
            <Swiper autoplay duration={2000} loop>
              {listSlider.map((item, index) => (
                <Swiper.Slide>
                  <Box
                    flex
                    key={index}
                    alignItems="center"
                    justifyContent="center"
                    className="relative aspect-w-3 aspect-h-2 w-full rounded-lg h-full "
                    // style={{ backgroundColor: "#0ebeb8" }}
                  >
                    <img
                      loading="lazy"
                      src={`https://miniapp.nhathuocnaman.com/${item.image}`}
                      alt=""
                      className="w-full h-full object-cover object-center overflow-hidden bg-skeleton"
                    />
                  </Box>
                </Swiper.Slide>
              ))}
            </Swiper>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Swiperbanner;
