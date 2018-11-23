const DebugButton = ({ name,handler }) => (
    <div>
        <button onClick={handler}>
            {name}
        </button>
        <style jsx>{`
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 9px 18px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 18px;
    }
        `}</style>
    </div>
  )

  export default DebugButton;