import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, ReactText, SetStateAction, useEffect, useState } from "react";
import { ShopCategory, ShopDataResponse } from "../utils/types";
import { getIcon, PositionIcon } from "./SearchBar";

const FilterCard: React.FC<{
  setShopType: (nextValue: ReactText) => void;
  setProvince: (nextValue: ReactText) => void;
  setRange: (nextValue: ReactText) => void;
  setSubShopType: (nextValue: ReactText) => void;
  setMinPrice: (nextValue: ReactText) => void;
  setMaxPrice: (nextValue: ReactText) => void;
  minPrice: number;
  maxPrice: number;
  shopTypeIndex: number;
  provinceIndex: number;
  priceRangeIndex: number;
  subShopTypeIndex: number;
  data: ShopDataResponse;
}> = ({
  setShopType,
  setSubShopType,
  setProvince,
  setRange,
  setMinPrice,
  setMaxPrice,
  minPrice,
  maxPrice,
  shopTypeIndex,
  subShopTypeIndex,
  provinceIndex,
  priceRangeIndex,
  data,
  ...props
}) => {
  const shopTypeList = ["ทั้งหมด", ...data.categories.map((category) => category.name)];
  const [subShopTypeList, setSubShopTypeList] = useState<string[]>([]);
  const provinceList = ["พื้นที่ใกล้ฉัน", "พื้นที่ทั้งหมด", ...data.provinces];
  const priceList = ["ทั้งหมด", ...data.priceRange];
  const [internalMinPrice, setInternalMinPrice] = useState<number>(minPrice);
  const [internalMaxPrice, setInternalMaxPrice] = useState<number>(maxPrice);

  useEffect(() => {
    setSubShopTypeList([]);
    if (shopTypeIndex > 0)
      setSubShopTypeList(["ทั้งหมด", ...data.categories[shopTypeIndex - 1].subcategories]);
  }, [shopTypeIndex]);

  useEffect(() => {
    if (internalMinPrice > internalMaxPrice) setInternalMaxPrice(internalMinPrice);
  }, [internalMinPrice]);

  useEffect(() => {
    if (internalMaxPrice < internalMinPrice) setInternalMinPrice(internalMaxPrice);
  }, [internalMaxPrice]);

  return (
    <Flex
      borderWidth={[" 0px", "0.5px", "0.5px"]}
      borderColor="rgba(0,0,0,0.65)"
      background="#fff"
      flexDir="column"
      minW={["0px", "355px", "355px"]}
      h="auto"
      p="16px"
    >
      <Text fontFamily="IBMPlexSansThai" fontSize="16px" fontWeight="600" paddingBottom="20px">
        ประเภทร้านค้า
      </Text>
      <RadioGroup
        onChange={setShopType}
        value={shopTypeIndex}
        defaultValue="0"
        paddingBottom="40px"
      >
        <Stack direction="column">
          {shopTypeList.map((category, index) => (
            <Radio
              value={`${index}`}
              key={category}
              isChecked={category === shopTypeList[shopTypeIndex]}
            >
              <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400">
                {category}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Text fontFamily="IBMPlexSansThai" fontSize="16px" fontWeight="600" paddingBottom="10px">
        จังหวัด/ใกล้ฉัน
      </Text>
      <Menu>
        <MenuButton
          background="#fff"
          as={Button}
          flex={1}
          minW="100% !important"
          border="gray.300"
          px="10px"
          minH="30px"
          marginBottom="30px"
          borderRadius="0px"
          borderWidth="1px"
          textAlign="start"
          fontSize="14px"
          fontWeight="400"
          leftIcon={getIcon(provinceList[provinceIndex])}
          rightIcon={<ChevronDownIcon fontSize="20px" color="gray.400" />}
        >
          {provinceList[provinceIndex]}
        </MenuButton>
        <MenuList borderRadius="0px" w="100%" overflowY="scroll" maxH="280px" fontSize="14px">
          {provinceList.map((province, index) => (
            <MenuItem
              key={province}
              onClick={() => {
                setProvince(index);
              }}
            >
              {getIcon(province)} {province}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Flex display={shopTypeIndex != 1 ? "flex" : "none"} flexDir="column">
        <Text
          display={shopTypeIndex != 1 ? "inherit" : "none"}
          fontFamily="IBMPlexSansThai"
          fontSize="16px"
          fontWeight="600"
          paddingBottom="5px"
        >
          ช่วงราคาสินค้า (บาท)
        </Text>
        <Flex alignItems="center">
          <NumberInput
            h="30px"
            onChange={(value) => {
              setInternalMinPrice((value as unknown) as number);
            }}
            placeholder="ราคาต่ำสุด"
            value={internalMinPrice}
            min={0}
          >
            <NumberInputField h="30px" borderRadius="0px" />
            <NumberInputStepper>
              <NumberIncrementStepper
                children={<ChevronUpIcon fontSize="14px" color="gray.400" />}
              />
              <NumberDecrementStepper
                children={<ChevronDownIcon fontSize="14px" color="gray.400" />}
              />
            </NumberInputStepper>
          </NumberInput>
          <Text fontFamily="IBMPlexSansThai" px="8px">
            -
          </Text>
          <NumberInput
            h="30px"
            onChange={(value) => {
              setInternalMaxPrice((value as unknown) as number);
            }}
            placeholder="ราคาสูงสุด"
            value={internalMaxPrice}
            min={0}
          >
            <NumberInputField h="30px" borderRadius="0px" />
            <NumberInputStepper>
              <NumberIncrementStepper
                // display="none"
                _groupHover={{ display: "none" }}
                children={<ChevronUpIcon fontSize="14px" color="gray.400" />}
              />
              <NumberDecrementStepper
                // display="none"
                _groupHover={{ display: "none" }}
                children={<ChevronDownIcon fontSize="14px" color="gray.400" />}
              />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Button
          marginTop="10px"
          bg="transparent"
          borderWidth="1px"
          borderRadius="0px"
          borderColor="blue.400"
          minH="32px"
          w="100%"
          onClick={() => {
            setMinPrice(internalMinPrice);
            setMaxPrice(internalMaxPrice);
          }}
        >
          <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400" color="blue.400">
            ตกลง
          </Text>
        </Button>
      </Flex>
      <Flex display={shopTypeIndex == 1 ? "flex" : "none"} flexDir="column">
        <Text fontFamily="IBMPlexSansThai" fontSize="16px" fontWeight="600" paddingBottom="10px">
          ราคา
        </Text>
        <Menu>
          <MenuButton
            background="#fff"
            as={Button}
            flex={1}
            minW="100% !important"
            border="gray.300"
            px="10px"
            minH="32px"
            borderRadius="0px"
            borderWidth="1px"
            textAlign="start"
            fontSize="14px"
            fontWeight="400"
            rightIcon={<ChevronDownIcon fontSize="22px" color="gray.400" />}
          >
            {priceList[priceRangeIndex]}
          </MenuButton>
          <MenuList borderRadius="0px" w="100%" overflowY="scroll" maxH="280px" fontSize="14px">
            {priceList.map((price, index) => (
              <MenuItem
                key={price}
                onClick={() => {
                  setRange(index);
                }}
              >
                {price}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Text
        fontFamily="IBMPlexSansThai"
        fontSize="16px"
        fontWeight="600"
        paddingTop="30px"
        paddingBottom="20px"
      >
        {shopTypeIndex > 0 ? `ประเภท${data.categories[shopTypeIndex - 1]?.name}` : ""}
      </Text>
      <RadioGroup
        display={shopTypeIndex > 0 ? "inherit" : "none"}
        onChange={setSubShopType}
        value={subShopTypeIndex}
        defaultValue="0"
        paddingBottom="40px"
      >
        <Stack direction="column">
          {subShopTypeList.map((subcategory, index) => (
            <Radio
              value={`${index}`}
              key={subcategory}
              isChecked={subcategory === subShopTypeList[subShopTypeIndex]}
            >
              <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400">
                {subcategory}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default FilterCard;
