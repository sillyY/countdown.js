abstract class Adapter {
  constructor(public readonly interval, public readonly executeFn: any) {}

  public abstract clear()
  public abstract run()
}
export default Adapter