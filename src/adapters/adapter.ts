abstract class Adapter {
  constructor(
    public readonly interval,
    public readonly executeFn: any,
    public time: string,
    public format: string
  ) {}

  public abstract clear()
  public abstract run()
}
export default Adapter
