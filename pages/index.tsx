import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import FilterCard from "../components/FilterCard";
import { PageContainer } from "../components/PageContainer";
import SearchBar from "../components/SearchBar";
import ShopCard from "../components/ShopCard";
import { Merchant, ShopDataResponse } from "../utils/types";

const SearchPage: React.FC<{
  data: ShopDataResponse;
}> = ({ data }) => {
  const [shopTypeIndex, setShopTypeIndex] = useState<number>(0);
  const [subShopTypeIndex, setSubShopTypeIndex] = useState<number>(0);
  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState<number>(0);
  const [priceRangeIndex, setPriceRangeIndex] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [filteredMerchantList, setMerchantList] = useState<Merchant[]>([]);
  const shopTypeList = ["ทั้งหมด", ...data.categories.map((category) => category.name)];
  const subShopTypeList =
    shopTypeIndex > 0 ? ["ทั้งหมด", ...data.categories[shopTypeIndex - 1]?.subcategories] : [];
  const provinceList = ["พื้นที่ใกล้ฉัน", "พื้นที่ทั้งหมด", ...data.provinces];
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    setSubShopTypeIndex(0);
    setMaxPrice(600);
    setMinPrice(0);
  }, [shopTypeIndex]);

  useEffect(() => {
    let merchantList = data.merchants;
    if (shopTypeIndex > 0) {
      merchantList = merchantList.filter((merchant) =>
        merchant.categoryName.includes(shopTypeList[shopTypeIndex])
      );
    }
    if (selectedProvinceIndex > 2)
      merchantList = merchantList.filter((merchant) =>
        merchant.addressProvinceName.includes(provinceList[selectedProvinceIndex])
      );
    if (shopTypeIndex == 1 && priceRangeIndex > 0) {
      merchantList = merchantList.filter((merchant) => merchant.priceLevel == priceRangeIndex);
    }
    if (shopTypeIndex > 1) {
      if (maxPrice >= 600)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel <= 4);
      if (maxPrice >= 300)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel <= 3);
      if (maxPrice >= 100)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel <= 2);
      else merchantList = merchantList.filter((merchant) => merchant.priceLevel <= 1);

      if (minPrice >= 600)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel >= 4);
      if (minPrice >= 300)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel >= 3);
      if (minPrice >= 100)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel >= 2);
      else merchantList = merchantList.filter((merchant) => merchant.priceLevel >= 1);
    }
    if (shopTypeIndex >= 1 && subShopTypeIndex > 0) {
      console.log(
        "check subtype",
        data.categories[shopTypeIndex - 1].subcategories[subShopTypeIndex - 1]
      );
      merchantList = merchantList.filter((merchant) =>
        merchant.subcategoryName.includes(
          data.categories[shopTypeIndex - 1].subcategories[subShopTypeIndex - 1]
        )
      );
    }
    if (keyword.length > 0)
      merchantList = merchantList.filter((merchant) =>
        merchant.shopNameTH.toLowerCase().match(keyword.toLowerCase())
      );
    console.log(shopTypeIndex, selectedProvinceIndex, subShopTypeIndex);
    setMerchantList(merchantList);
  }, [
    shopTypeIndex,
    selectedProvinceIndex,
    priceRangeIndex,
    subShopTypeIndex,
    minPrice,
    maxPrice,
    keyword,
  ]);

  return (
    <Flex flexDir="column">
      <Head>
        <title>โครงการคนละครึ่ง</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar
        onOpen={onOpen}
        setKeyword={(value) => setKeyword(value as string)}
        shopTypes={[...data.categories.map((category) => category.name)]}
        shopTypeIndex={shopTypeIndex}
        setShopType={(nextValue) => {
          setShopTypeIndex(nextValue as number);
        }}
        provinces={provinceList}
        selectedProvinceIndex={selectedProvinceIndex}
        setProvince={(nextValue) => {
          setSelectedProvinceIndex(nextValue as number);
        }}
      />
      <PageContainer background="url('/images/result-bg.png')">
        <Text
          paddingTop="20px"
          paddingBottom="50px"
          fontFamily="IBMPlexSansThai"
          fontSize="20px"
          fontWeight="700"
        >
          {" "}
          ผลการค้นหา {shopTypeIndex > 0 ? shopTypeList[shopTypeIndex] : ""}
          {shopTypeIndex > 0 && keyword.length > 0 ? ` , ` : ""}
          {keyword.length > 0 ? keyword : ""} ทั้งหมด
        </Text>
        <Flex flexDir="row">
          <Flex
            flex={1}
            flexDir="column"
            paddingRight="30px"
            display={["none", "inherit", "inherit"]}
          >
            <FilterCard
              data={data}
              setShopType={(nextValue) => {
                setShopTypeIndex(nextValue as number);
              }}
              setProvince={(nextValue) => {
                setSelectedProvinceIndex(nextValue as number);
              }}
              setRange={(nextValue) => {
                setPriceRangeIndex(nextValue as number);
              }}
              setSubShopType={(nextValue) => {
                setSubShopTypeIndex(nextValue as number);
              }}
              setMinPrice={(nextValue) => {
                setMinPrice(nextValue as number);
              }}
              setMaxPrice={(nextValue) => {
                setMaxPrice(nextValue as number);
              }}
              minPrice={minPrice}
              maxPrice={maxPrice}
              shopTypeIndex={shopTypeIndex}
              subShopTypeIndex={subShopTypeIndex}
              provinceIndex={selectedProvinceIndex}
              priceRangeIndex={priceRangeIndex}
            />
          </Flex>
          <Flex flex={3.1} paddingRight={["0px", "10px"]} flexDir="column">
            {filteredMerchantList.map((merchant) => (
              <ShopCard merchantData={merchant} key={merchant.shopNameTH} />
            ))}
          </Flex>
        </Flex>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"full"}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader p="0px">
                <Flex
                  background="#27397c"
                  h="46px"
                  flexDir="row"
                  color="#fff"
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <IconButton
                    background="transparent"
                    height="100%"
                    p="0px"
                    border="0px"
                    aria-label="Search"
                    onClick={onClose}
                    icon={<ChevronLeftIcon fontSize="40px" color="#fff" />}
                  ></IconButton>
                  <Text fontFamily="IBMPlexSansThai" fontSize="20px" fontWeight="700">
                    กรอกผล
                  </Text>
                  <ChevronLeftIcon fontSize="40px" color="transparent" />
                </Flex>
              </DrawerHeader>

              <DrawerBody>
                <FilterCard
                  data={data}
                  setShopType={(nextValue) => {
                    setShopTypeIndex(nextValue as number);
                  }}
                  setProvince={(nextValue) => {
                    setSelectedProvinceIndex(nextValue as number);
                  }}
                  setRange={(nextValue) => {
                    setPriceRangeIndex(nextValue as number);
                  }}
                  setSubShopType={(nextValue) => {
                    setSubShopTypeIndex(nextValue as number);
                  }}
                  setMinPrice={(nextValue) => {
                    setMinPrice(nextValue as number);
                  }}
                  setMaxPrice={(nextValue) => {
                    setMaxPrice(nextValue as number);
                  }}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  shopTypeIndex={shopTypeIndex}
                  subShopTypeIndex={subShopTypeIndex}
                  provinceIndex={selectedProvinceIndex}
                  priceRangeIndex={priceRangeIndex}
                />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </PageContainer>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://panjs.com/ywc18.json");
  const body: ShopDataResponse = await res.json();
  const nonDuplicateSubCategories: Set<string> = new Set(body.categories[0].subcategories);
  body.categories[0].subcategories = [];
  nonDuplicateSubCategories.forEach((item) => body.categories[0].subcategories.push(item));
  for (let x = 0; x < body.merchants.length; x++) {
    if (body.merchants[x].categoryName == "ร้านอาหาร")
      body.merchants[x].categoryName = "ร้านอาหารและเครื่องดื่ม";
    if (body.merchants[x].categoryName == "แฟชั่น") body.merchants[x].categoryName = "สินค้าทั่วไป";
    if (body.merchants[x].categoryName == "งานบริการอื่นๆ / เบ็ดเตล็ด")
      body.merchants[x].categoryName = "สินค้าทั่วไป";
    if (body.merchants[x].subcategoryName == "สินค้า และ บริการ เกี่ยวกับการตกแต่งบ้าน")
      body.merchants[x].subcategoryName = "สินค้าเกี่ยวกับการตกแต่งบ้าน";
  }

  return {
    props: {
      data: body,
    },
  };
};

export default SearchPage;
