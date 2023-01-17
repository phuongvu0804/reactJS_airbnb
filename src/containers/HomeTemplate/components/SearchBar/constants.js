import { LocationOn } from "@mui/icons-material";
import { Link } from "react-router-dom";

const searchTabsMobile = ["Anywhere", "Any week", "Add guests"];

export const handleFilterResultList = (searchData, locationList, setResultList) => {
    if (searchData !== "") {
        const filteredList = locationList?.filter((item) =>
            item.tenViTri?.toLowerCase().includes(searchData.toLowerCase()),
        );
        setResultList(filteredList);
    } else {
        setResultList([]);
    }
};

export const renderPosition = (
    resultList,
    filteredValues,
    setFilteredValues,
    setSearchData,
    setIsActiveSearchResult,
) => {
    return resultList?.map((item, index) => (
        <div
            key={index}
            className="search-bar__result-item"
            onClick={() => {
                setFilteredValues({
                    ...filteredValues,
                    locationId: item.id,
                    locationName: item.tenViTri,
                });

                setSearchData(item.tenViTri);
                setIsActiveSearchResult(false);
            }}
        >
            <LocationOn />
            <span>
                {item.tenViTri} - {item.tinhThanh} City - {item.quocGia}
            </span>
        </div>
    ));
};

export { searchTabsMobile };
