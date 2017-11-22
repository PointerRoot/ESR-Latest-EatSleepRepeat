using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;

namespace AdminESR
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute("DefaultApiGet",
                             "api/{controller}",
                             new { action = "Get" },
                             new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });

            config.Routes.MapHttpRoute("DefaultApiGetWithId",
                                        "api/{controller}/{id}",
                                        new { id = RouteParameter.Optional, action = "Get" },
                                        new { id = @"\d+" });

            config.Routes.MapHttpRoute("DefaultApiWithAction",
                                        "api/{controller}/{action}");

            config.Routes.MapHttpRoute("DefaultApiWithActionAndId",
                                        "api/{controller}/{action}/{id}",
                                        new { id = RouteParameter.Optional },
                                        new { id = @"\d+(_\d+)?" });
        }
    }
}
