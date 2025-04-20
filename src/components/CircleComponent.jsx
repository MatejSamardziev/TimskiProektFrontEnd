const CircleComponent = ({ color = "black", size = 20 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );
};

export default CircleComponent;
