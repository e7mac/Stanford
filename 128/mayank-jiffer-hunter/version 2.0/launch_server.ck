if (me.args() > 0)
{
    Machine.add("config.ck:"+me.arg(0));
}
else
{
    Machine.add("config.ck");
}
Machine.add("server.ck");