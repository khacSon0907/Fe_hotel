import React from 'react';
import '../../styles/pages/iteamRoom.scss';

const hotelList = [
  {
    image: "src/assets/Khachsan1.jpg",
    title: 'Muong Thanh Grand Da Nang Hotel',
    location: 'An Hải Tây',
    price: '743.142',
  },
  {
    image: "src/assets/Khachsan2an2.jpg",
    title: 'Melia Vinpearl Danang Riverfront',
    location: 'An Hải Bắc',
    price: '1.951.303',
  },
  {
    image: "src/assets/khachsan3.jpg",
    title: 'Davue Hotel Da Nang',
    location: 'Mỹ An',
    price: '405.665',
  },
  {
    image: "src/assets/khachsan4.jpg",
    title: 'Raon Danang Beach Hotel - STAY 24H',
    location: 'Mỹ An',
    price: '395.857',
  }
];

export default function IteamRoom() {
  return (
    <div className="iteam-room-container">
      {hotelList.map((item, idx) => (
        <div className="iteam-room" key={idx}>
          <img src={item.image} alt={item.title} />
          <div className="iteam-room__info">
            <div className="iteam-room__title">{item.title}</div>
            <div className="iteam-room__location">{item.location}</div>
            <div className="iteam-room__price">{item.price} VND</div>
          </div>
        </div>
      ))}
    </div>
  );
}
