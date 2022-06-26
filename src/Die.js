export default function Die(props) {


    return (
        <div className={props.die.isHeld ? 'die-face  selected' : 'die-face '} onClick={() => { props.holdDice(props.die.id) }}>
            <h1 className="die-num ">{props.die.value}</h1>
        </div>
    )
}