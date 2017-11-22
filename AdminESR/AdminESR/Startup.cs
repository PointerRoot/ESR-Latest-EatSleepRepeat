using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AdminESR.Startup))]
namespace AdminESR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
