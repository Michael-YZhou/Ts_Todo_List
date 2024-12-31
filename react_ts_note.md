# React TS 笔记
## 什么时候限定type:
- 组件接受prop时，在解构prop的时候限定接受到的props的type
  ```typescript
  export default function CourseGoal({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <article>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button>Delete</button>
      </article>
    );
  }
  ```
  
- 在设定state初始化值的时候，如果初始化的是复杂数据结构（如: Array, Object)，使用generic设定复杂结构内部数据的type。
  ```typescript
  // State初始化值是一个CourseGoal的Array.
  type CourseGoal = {
    title: string;
    description: string;
    id: number;
  };
  
  export default function App() {
    const [goals, setGoals] = useState<CourseGoal[]>([]);
  };
  ```
- 在提交form的时候，给 onSubmit 的回调函数传入的event限定type。
  ```typeScript
  export default function NewGoal() {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="goal">Your Goal</label>
          <input id="goal" type="text" />
        </p>
        <p>
          <button>Add Goal</button>
        </p>
      </form>
    );
  }
  ```
- 在使用 useRef() 的时候，给 ref 的初始值限定type。这样在使用 ref.current!.value时，compiler才知道这个 ref 是连接到一个HTMLInputElenemt, 他有一个value属性。
  ```typeScript
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);
  
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input id="goal" type="text" ref={goal} />
      </p>
      <p>
        <label htmlFor="Summary">Short Summary</label>
        <input id="Summary" type="text" ref={summary} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
  ```