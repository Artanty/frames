import React, { useState, useEffect } from "react";
import { FileDTO } from "./Dropzone";
import styles from '@styles/components/masonry.scss'
import Icon from "../../components/Icon";
import Dropdown from "./Dropdown";
import MasonryItemControl from "./MasonryItemControl";

export default function Masonry ({ data, updateDataAway }: { data: FileDTO[], updateDataAway: Function}) {
  const [columns, setColumns] = useState(3);
  const [items, setItems] = useState<FileDTO[]>([]);

  const updateColumns = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) {
      setColumns(3);
    } else if (windowWidth >= 768) {
      setColumns(2);
    } else {
      setColumns(1);
    }
  }
  
  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    const itemsWithSizes = data.map((item: FileDTO) => {
      return new Promise(resolve => {
        const image = new Image();
        image.src = item.url;
        image.onload = () => {
          resolve({
            ...item,
            width: image.width,
            height: image.height
          });
        };
      });
    });

    Promise.all(itemsWithSizes).then((images: any) => {
      const updatedData = data.map((file: FileDTO) => {
        const foundImage = images.find((img: any) => img.url === file.url)
        if (foundImage) {
          file.width = foundImage.width
          file.height = foundImage.height
        }
        return file
      })
      setItems(updatedData)
    });

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, [data]);

  const getShortestColumn = () => {
    const columnHeights = Array.from(
      { length: columns },
      () => 0
    );
    items.forEach((item: any) => {
      const minHeight = Math.min(...columnHeights);
      const columnIndex = columnHeights.indexOf(minHeight);
      columnHeights[columnIndex] += item.height;
    });
    return columnHeights.indexOf(Math.min(...columnHeights));
  };

  const handleItemClick = (item: any) => {
    // console.log(item);
  };

  const handleUpdatedItem = (item: any) => {
    console.log(item)
    updateDataAway()
  }

  return (
    <div className="masonry-grid">
      {Array.from({ length: columns }, (_, columnIndex) => (
        <div key={columnIndex} className="masonry-column">
          {items
            .filter((_, index) => index % columns === columnIndex)
            .map((item: any, index: number) => (
              <div
                key={`${item.id}-${index}`}
                className="masonry-item"
                style={{ paddingBottom: `${(item.height / item.width) * 1}%` }}
                onClick={() => handleItemClick(item)}
              >
                <MasonryItemControl item={item} updatedItemAway={handleUpdatedItem}></MasonryItemControl>
                <img className="masonry-item-img" src={item.url} alt="" />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
