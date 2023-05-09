import React, { useState, useEffect } from "react";
import { FileDTO } from "./Dropzone";
import styles from '@styles/components/masonry.scss'

export default function Masonry ({ data }: { data: FileDTO[]}) {
  const [columns, setColumns] = useState(3);
  const [items, setItems] = useState([]);

  const updateColumns = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) {
      setColumns(3);
    } else if (windowWidth >= 768) {
      setColumns(2);
    } else {
      setColumns(1);
    }
  };
  function cropImage(imageUrl: string, maxWidth: number) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        const aspectRatio = image.width / image.height;
        const newHeight = maxWidth / aspectRatio;
  
        const canvas = document.createElement("canvas");
        canvas.width = maxWidth;
        canvas.height = newHeight;
  
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(image, 0, 0, maxWidth, newHeight);
  
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      image.src = imageUrl;
    });
  }
  
  // Usage example
  const imageUrl = "https://example.com/image.jpg";
  const maxWidth = 300;
  cropImage(imageUrl, maxWidth)
    .then((dataURL) => {
      console.log(dataURL);
    })
    .catch((error) => {
      console.error(error);
    });
  
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

    Promise.all(itemsWithSizes).then((items: any) => {
      console.log(items)
      setItems(items)
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
    console.log(item);
  };

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
                <img className="masonry-item-img" src={item.url} alt="" />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
