import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import CloseIcon from "@mui/icons-material/Close";
import "../index.css"; 
import { formatRupiah } from "../utils/formatCurrency"; 

const PopupProduct = ({ product, open, onClose }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOverlayVisible(true);
    } else {
      // Delay the removal of the overlay to allow the closing animation to complete
      const timer = setTimeout(() => {
        setIsOverlayVisible(false);
      }, 300); // Match this duration with your CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div className={isOverlayVisible ? "modal-overlay" : ""}>
      <Popup open={open} onClose={onClose} position="right center">
        {close => (
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{product.nama}</h2>
              <span onClick={close} className="cursor-pointer">
                <CloseIcon />
              </span>
            </div>
            <img
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "https://via.placeholder.com/150"
              }
              alt={product.nama || "Product Image"}
              className="w-full h-auto mb-2"
            />
            <div className="flex w-full px-5 py-4 mt-4 text-sm bg-white border rounded-lg">
              <table
                className="w-full rounded-lg table-auto"
                aria-label="table informasi produk"
              >
                <tbody className="w-full">
                  <tr>
                    <td className="p-3 font-semibold text-gray-500 whitespace-nowrap">
                      Barcode
                    </td>
                    <td className="p-3">{product.barcode || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-500">Unit</td>
                    <td className="p-3">{product.satuan || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-500">
                      Discount
                    </td>
                    <td className="p-3">
                      {product.diskon_persen &&
                      parseFloat(product.diskon_persen) > 0 ? (
                        <span className="text-red-500 text-xs font-bold">
                          -{product.diskon_persen}%
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          No Discount
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-500">
                      Online Price
                    </td>
                    <td className="p-3">
                      {product.harga?.jual_online
                        ? formatRupiah(product.harga.jual_online)
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-500">
                      Reseller Price
                    </td>
                    <td className="p-3">
                      {product.harga?.jual_reseller
                        ? formatRupiah(product.harga.jual_reseller)
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-500">
                      Retail Price
                    </td>
                    <td className="p-3">
                      {product.harga?.jual
                        ? formatRupiah(product.harga.jual)
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default PopupProduct;
