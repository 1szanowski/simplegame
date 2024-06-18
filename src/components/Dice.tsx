type DiceProps = {
  value: number;
  isHeld: boolean;
  id: string;
  holdDice: (id: string) => void;
};

export default function Dice({ value, isHeld, id, holdDice }: DiceProps) {
  const styles = { backgroundColor: isHeld ? "#59E391" : "white" };

  return (
    <div className="die-face" style={styles} onClick={() => holdDice(id)}>
      <h2 className="die-num">{value}</h2>
    </div>
  );
}
