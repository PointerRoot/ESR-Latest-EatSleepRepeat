using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security; 
using System.Web.Security;
using AdminESR.DAL;
//using AdminESR.Models;
using AdminESR;
using AdminESR.Context;
using AdminESR.Models;
using System.Web.Helpers;
using System.Collections.Generic;

namespace AdminESR.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager )
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            try
            {
               UserAdmin user = new  UserAdmin() { Email = model.Email, Password = model.Password };

                user = Repository.GetUserDetails(user);

                if (user.Email != null)
                {
                    FormsAuthentication.SetAuthCookie(model.Email, false);
                    var authTicket = new FormsAuthenticationTicket(1, user.Email, DateTime.Now, DateTime.Now.AddMinutes(20), false, user.Roles);
                    string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
                    var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                    HttpContext.Response.Cookies.Add(authCookie);
                    return RedirectToAction("adminPage", "Admin");
                }
                else
                {
                    ModelState.AddModelError("", "Username or password is Incorrect!");
                    return View(model);
                }
            }
            catch(Exception e) { return View(model); }
        }
         
        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            //AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            FormsAuthentication.SignOut();
            Session.Clear();
            Session.Abandon();
            return RedirectToAction("login", "Account");
        } 
        [AllowAnonymous]
        public ActionResult UserLogin(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        } 
        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> UserLogin(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            try
            {
                UserAdmin user = new UserAdmin() { Email = model.Email, Password = model.Password };

                user = Repository.GetWebUserDetails(user);

                if (user.Email != null)
                {
                    FormsAuthentication.SetAuthCookie(model.Email, false);
                    var authTicket = new FormsAuthenticationTicket(1, user.Email, DateTime.Now, DateTime.Now.AddMinutes(20), false, user.Roles);
                    string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
                    var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                    HttpContext.Response.Cookies.Add(authCookie);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Username or password is Incorrect!");
                    return View(model);
                }
            }
            catch (Exception e) { return View(model); }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }
        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var val = "";
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user, model.Password);
                try
                {
                    var checkusername = obj.Users.First(x => x.Name.Equals(user.UserName));
                    if (checkusername.Name == user.Email)
                    {
                        ModelState.AddModelError("", "Username Already Taken");
                        val = "true";
                    }
                }
                catch (Exception e)
                {
                    val = "false";

                }  
                if (result.Succeeded && val != "true")
                { 
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    try
                    { 
                        User info = new User();
                        info.Name = user.UserName;
                        info.Email = user.Email;
                        info.Contact = model.Contact;
                        // info.Image = model.Image;   
                        info.Address = model.Address;
                        info.Status = 1;
                        info.AddDate = (DateTime.Now.ToString());
                        obj.Users.InsertOnSubmit(info);
                        obj.SubmitChanges();

                        //inserting image
                        var httpPostedFile = System.Web.HttpContext.Current.Request.Files["image"];
                        string httpPostedFile1 = httpPostedFile.FileName;
                        string[] httpPostedFile2 = httpPostedFile1.Split('.');
                        var typeOfImage = "." + httpPostedFile2[httpPostedFile2.Length - 1];

                        if (httpPostedFile != null)
                        {
                            WebImage img = new WebImage(httpPostedFile.InputStream);
                            if (img.Width > 1000)
                                img.Resize(1000, 1000);
                            img.Save(@"~\Content\Images\User\" + (info.Id + typeOfImage));
                        }
                        info.Image = (info.Id + typeOfImage);
                        obj.SubmitChanges();

                        UserLogin obj1 = new UserLogin();
                        obj1.UserName = info.Name;
                        obj1.Password = model.Password;
                        obj1.UserId = info.Id;
                        obj1.Status = 1;

                    }
                    catch (Exception e)
                    {

                    }
                    List<string> upperCarousel = new List<string>();
                    List<string> lowerCarousel = new List<string>();
                    var clients = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();

                    foreach (var details in clients)
                    {
                        var clientPackages = obj.ClientPakages.Where(x => x.ClientId.Equals(details.Id)).ToList();
                        foreach (var details1 in clientPackages)
                        {
                            if (details1.Pakage.PakageType == "gold")
                            {
                                upperCarousel.Add(details.Image);
                            }
                            else if (details1.Pakage.PakageType == "silver")
                            {
                                lowerCarousel.Add(details.Image);
                            }
                        }

                    }

                    ViewBag.upperCarousel = upperCarousel;
                    ViewBag.lowerCarousel = lowerCarousel;

                    Client obj2 = new Client();
                    var data2 = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();
                    ViewBag.details1 = data2;



                    // For more information on how to enable account confirmation and password reset please visit https://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

                    return RedirectToAction("Index", "Home");
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }
        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }
        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("UserLogin", "Account");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    var user = await UserManager.FindAsync(loginInfo.Login);
                    if (user != null)
                    {
                        //await StoreClaimsTokens(user);
                        //await SignInAsync(user, ispersistent: false);
                    }
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    FormsAuthentication.SetAuthCookie(loginInfo.DefaultUserName, false);
                    var authTicket = new FormsAuthenticationTicket(1, loginInfo.DefaultUserName, DateTime.Now, DateTime.Now.AddMinutes(20), false, "All");
                    string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
                    var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                    HttpContext.Response.Cookies.Add(authCookie);
                    return RedirectToAction("Index", "Home"); 
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("../../Account/UserLogin");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }


        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("login", "Account");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}