export function About({ children, age, address }) {
  return (
    <div>
      <h1>Hello My Name Is {children}</h1>
      <div>
        <p> My age is {age} is not to old for me? HEHE</p>
        <p> My address is {address}</p>
      </div>
    </div>
  );
}
