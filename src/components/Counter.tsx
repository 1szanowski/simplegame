type PropsCounter = {
  score: number;
};

export default function Counter({ score }: PropsCounter) {
  return (
    <div>
      Number of turns: <h3 className="score">{score}</h3>
    </div>
  );
}
