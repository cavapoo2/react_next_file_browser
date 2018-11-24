import PropTypes from 'prop-types'; // ES6

const dirOrFile = (v) => v ? colorBlue : colorBlack;

const colorBlue = {
    color: 'blue'
}
const colorBlack = {
    color: 'black'
}

const ListItems = ({list,handler}) => {
   // console.log(list);
    return list.map(filedata => <li style={dirOrFile(filedata[1])} onClick={e => handler(e,filedata[0])} key={filedata[0]}>{filedata[0]} </li>)
}

ListItems.propTypes ={
    list: PropTypes.array,
    handler: PropTypes.func,
        
    }

export default ListItems;