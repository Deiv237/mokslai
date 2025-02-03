import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../helpers/get";
import QRCode from "qrcode";
import ticket from "../assets/ticket.svg";
import { FaGithub } from "react-icons/fa6";
import Logo from "../assets/logo.svg";

const GetTicket = () => {
  const { userId } = useParams(); // get ID from URL
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");

  const todayDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await getById(userId);

        console.log(response);

        const name = response.users;
        const email = response.email;
        const github = response.github;
        setName(name);
        setEmail(email);
        setGithub(github);

        if (response && response.link) {
          const qrDataUrl = await QRCode.toDataURL(response.link);
          setQrCodeUrl(qrDataUrl);
        } else {
          console.error("QR code not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchQRCode();
  }, [userId]);

  return (
    <div>
      <div className="text-white inconsolata text-[60px] whitespace-pre mb-5">
        Congrats, {name}!<br></br>
        Your ticket is ready.
      </div>

      <div className="text-[24px] inconsolata text-white mb-3">
        We've emailed your ticket to<br></br>
        <span className="text-[#F57463]">{email}</span> and will send updates in
        <br></br>
        the run up to the event.
      </div>

      {/* Ticket Card */}
      <div className="w-full h-full relative max-w-[500px] mx-auto">
        <div className="relative">

        {/* Logo mark*/}
        <div className="absolute top-3 left-4 flex justify-end">
        <img className="" src={Logo} />
        <div>
        <p><span className="text-white inconsolata p-3 text-[35px]">Coding Conf 2025</span></p>
        <div className="flex pl-4">
        <p className="text-[#D1D0D5]">{todayDate}</p>
        </div>
        </div>
        </div>

        {/* QR Code */}
          <img className="mx-auto" src={ticket} />
          <div className="absolute bottom-7 left-4 flex justify-end">
            <img className="w-20 h-20 rounded-[10px]" src={qrCodeUrl} alt="QR Code" />
                <div className="pt-3">
                <p><span className="pl-2 text-white inconsolata text-[25px]">{name}</span></p>
                <div className="flex items-center pl-2">
                <FaGithub className="w-6 h-5 text-white" />
                <p><span className="text-white pl-2 inconsolata text-[14px]">{github}</span></p>
                </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetTicket;
