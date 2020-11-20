import { AtSignIcon, ChevronDownIcon, Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactText, useRef, useState } from "react";

export const PositionIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
  </Icon>
);

export const DoublePositionIcon = (props) => (
  <Icon viewBox="0 0 26 34" {...props}>
    <path
      d="M8 0C3.802 0 0 3.403 0 7.602C0 11.8 3.469 16.812 8 24C12.531 16.812 16 11.8 16 7.602C16 3.403 12.199 0 8 0ZM8 11C6.343 11 5 9.657 5 8C5 6.343 6.343 5 8 5C9.657 5 11 6.343 11 8C11 9.657 9.657 11 8 11Z"
      fill="black"
    />
    <path
      d="M16.577 32.2666L17 32.9376L17.423 32.2666C17.862 31.5701 18.292 30.8927 18.7103 30.2336C20.4424 27.5046 21.9763 25.0879 23.1399 22.9159C24.5824 20.223 25.5 17.8295 25.5 15.602C25.5 11.0945 21.4417 7.5 17 7.5C12.5594 7.5 8.5 11.0945 8.5 15.602C8.5 17.8295 9.4176 20.223 10.8601 22.9159C12.0237 25.0879 13.5576 27.5046 15.2896 30.2336C15.708 30.8927 16.138 31.5701 16.577 32.2666ZM17 18.5C15.6191 18.5 14.5 17.3809 14.5 16C14.5 14.6191 15.6191 13.5 17 13.5C18.3809 13.5 19.5 14.6191 19.5 16C19.5 17.3809 18.3809 18.5 17 18.5Z"
      fill="black"
      stroke="white"
    />
  </Icon>
);

export const getIcon = (province) => {
  if (province === "พื้นที่ใกล้ฉัน") return <PositionIcon fontSize="20px" />;
  if (province === "พื้นที่ทั้งหมด") return <DoublePositionIcon fontSize="20px" />;
  else return <></>;
};

const SearchField: React.FC<{
  provinces: string[];
  shopTypeIndex: number;
  shopTypes: string[];
  selectedProvinceIndex: number;
  setKeyword: (nextValue: ReactText) => void;
  setShopType: (nextValue: ReactText) => void;
  setProvince: (nextValue: ReactText) => void;
}> = ({
  provinces,
  shopTypeIndex,
  shopTypes,
  selectedProvinceIndex,
  setKeyword,
  setProvince,
  setShopType,
}) => {
  const [internalKeyword, setInternalKeyword] = useState<string>("");
  return (
    <Flex flex={1} flexDir="column" maxWidth={["100%", "1040px"]}>
      <InputGroup fontFamily="IBMPlexSansThai">
        <InputLeftAddon
          display={["none", "inherit", "inherit"]}
          p="0px"
          minW="190px !important"
          children={
            <Menu>
              <MenuButton
                background="#fff"
                borderColor="gray.100"
                borderRightWidth="0px"
                as={Button}
                px="10px"
                flex={1}
                textAlign="start"
                fontSize="14px"
                fontWeight="400"
                leftIcon={getIcon(provinces[selectedProvinceIndex])}
                rightIcon={<ChevronDownIcon fontSize="22px" color="gray.400" />}
              >
                {provinces[selectedProvinceIndex]}
              </MenuButton>
              <MenuList borderRadius="0px" overflowY="scroll" maxH="280px" fontSize="14px">
                {provinces.map((province, index) => (
                  <MenuItem
                    key={`searchBar-${province}`}
                    onClick={() => {
                      setProvince(index);
                    }}
                  >
                    {getIcon(province)} {province}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          }
        />
        <Menu>
          <Input
            fontFamily="IBMPlexSansThai"
            fontSize="14px"
            placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
            onChange={(event) => setInternalKeyword(event.target.value)}
          />
          <InputRightAddon
            width="60px"
            maxW="60px"
            justifyContent="center"
            p="0px"
            children={
              <IconButton
                background="gray.50"
                flex={1}
                height="100%"
                p="0px"
                border="0px"
                aria-label="Search"
                onClick={() => setKeyword(internalKeyword)}
                icon={<SearchIcon fontSize="12px" />}
              ></IconButton>
            }
          />
          {/* <MenuList borderRadius="0px" overflowY="scroll" maxH="280px" fontSize="14px">
            {shopTypes.map((province, index) => (
              <MenuItem
                key={`searchBar-${province}`}
                onClick={() => {
                  setProvince(index);
                }}
              >
                {getIcon(province)} {province}
              </MenuItem>
            ))}
          </MenuList> */}
        </Menu>
      </InputGroup>
    </Flex>
  );
};

const SearchBar: React.FC<{
  shopTypeIndex: number;
  shopTypes: string[];
  provinces: string[];
  selectedProvinceIndex: number;
  onOpen: () => void;
  setKeyword: (nextValue: ReactText) => void;
  setShopType: (nextValue: ReactText) => void;
  setProvince: (nextValue: ReactText) => void;
}> = ({
  shopTypeIndex,
  shopTypes,
  provinces,
  selectedProvinceIndex,
  setKeyword,
  setProvince,
  setShopType,
  onOpen,
}) => {
  return (
    <Box>
      <Flex w="100%" h="60px" flexDir="row" py="10px" px={["4%", "10%"]} flex={1}>
        <Link href="https://search-merchant.คนละครึ่ง.com">
          <Image
            src="/images/halfhalf-logo.png"
            w="auto"
            h="40px"
            m="0px"
            p="0px"
            marginRight="30px"
            display={["none", "flex", "flex"]}
          />
        </Link>
        <Link href="https://search-merchant.คนละครึ่ง.com">
          <Image
            src="/images/halfhalf-logo-mini.png"
            w="auto"
            h="40px"
            m="0px"
            p="0px"
            marginRight="16px"
            display={["flex", "none", "none"]}
          />
        </Link>
        <SearchField
          setKeyword={setKeyword}
          shopTypes={shopTypes}
          shopTypeIndex={shopTypeIndex}
          setShopType={setShopType}
          provinces={provinces}
          selectedProvinceIndex={selectedProvinceIndex}
          setProvince={setProvince}
        />
        <Button
          background="transparent"
          p="0px"
          display={["inherit", "none", "none"]}
          onClick={onOpen}
        >
          <Image src="/images/filter.png" w="19px" h="19px" />
        </Button>
      </Flex>
      <Flex
        background="#27397c"
        h="46px"
        flexDir="row"
        color="#fff"
        px="10%"
        alignItems="center"
        w="100%"
      >
        <Link href="https://search-merchant.คนละครึ่ง.com">
          <Text as="button" fontFamily="IBMPlexSansThai" fontSize="14px" textDecoration="underline">
            หน้าแรก{" "}
          </Text>
        </Link>
        <Text fontFamily="IBMPlexSansThai" fontSize="14px" px="12px">
          /
        </Text>
        <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="bold">
          ค้นหา{" "}
        </Text>
      </Flex>
    </Box>
  );
};

export default SearchBar;
