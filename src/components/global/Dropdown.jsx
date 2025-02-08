"use client";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Loading from "./Loading";

const Dropdown = ({ page }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const fetchBoards = async () => {
        setLoading(true); // Start loading
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/board_options/",
            {
              method: "POST",
              body: JSON.stringify({ clerk_id: user.id }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            setBoards(data.boards);
          } else {
            console.error("Failed to fetch boards");
          }
        } catch (error) {
          console.error("Error fetching boards:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchBoards();
    }
  }, [user]);

  return (
    <div className="p-8 pb-56 flex items-center justify-center bg-white">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-4 py-4 rounded-md text-gray-50 bg-coral hover:bg-coral/80 transition-colors duration-300"
        >
          <span className="font-medium text-sm">Choose a Board</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-2xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          {loading ? (
            <Loading /> // Show the loading indicator when fetching
          ) : boards.length > 0 ? (
            boards.map((board) => (
              <Option
                key={board.id}
                text={board.title}
                page={page}
                id={board.id}
              />
            ))
          ) : (
            <li className="text-sm text-gray-500 p-2">No boards available</li>
          )}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, page, id }) => {
  let route = `/${page}/${id}`;

  const handleClick = () => {
    window.location.href = route;
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-light_vanilla text-slate-700 hover:text-black transition-colors cursor-pointer"
    >
      <span>{text}</span>
    </motion.li>
  );
};

export default Dropdown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.01,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};
