const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 10,
      width: 340,
      backgroundColor: "#757575",
      borderRadius: 50,
      marginLeft: 20,
      maringTop: 0
    }
  
    const fillerStyles = {
      height: 10,
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;