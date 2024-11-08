import { useState, useEffect } from "react";
import { About } from "./About/About";
import "./NavbarWithStyling.css";
import { useNavbar } from "../hooks/UseNavbar";
import { HoverButton } from "./Elements/button/HoverButton";

function NavbarWithStyling({ menu, name, age, address }) {
  let List;
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const {
    isToggle,
    isActiveToggle,
    count,
    isCount,
    isField,
    isFieldFilled,
    isClick,
    isClicked,
  } = useNavbar();

  if (menu) {
    List = (
      <ul className="navbar-list">
        {menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  } else {
    List = <h1>tidak ditemukan</h1>;
  }

  function handleTriggerSelect(selectedStudent) {
    console.log(`ini adalah handling punya ${selectedStudent}`);

    setSelectedStudent(selectedStudent);
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  return (
    <div className="card-container">
      {/* Modal Component */}
      {isModal && selectedStudent && (
        <div className="overlay">
          <div className="modal">
            <div className="content">
              <h2>Hello {selectedStudent.name}</h2>
              <p>I am {selectedStudent.name}</p>
              <p>My age is {selectedStudent.age}</p>
              <p>My address is {selectedStudent.address}</p>
            </div>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h1 className="navbar-title">FSW 2 {name}</h1>
        <ul className="navbar-info">
          <li>{age}</li>
          <li>{address}</li>
        </ul>
        <div className="navbar-separator" />

        {List}

        <div className="navbar-buttons">
          <button
            onClick={() => isClicked(!isClick)}
            className={`toggle-button ${isClick ? "active" : ""}`}
          >
            Click Me
          </button>

          <button
            onClick={() => isActiveToggle(!isToggle)}
            className={`toggle-button ${isToggle ? "active" : ""}`}
          >
            Hello click me on the button
          </button>

          <button onClick={() => isCount(count + 1)} className="count-button">
            Count: {count}
          </button>

          <input
            type="text"
            onChange={() => isFieldFilled(true)}
            className={`input-field ${isField ? "active" : ""}`}
            placeholder="Type something..."
          />
        </div>
      </div>
      <About children={name} age={age} address={address} />
      <HoverButton onSelect={() => handleTriggerSelect({ name, age, address })}>
        Click Me
      </HoverButton>
    </div>
  );
}

export default NavbarWithStyling;
