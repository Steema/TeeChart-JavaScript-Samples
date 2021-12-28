using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TeeChartJS_SignalR.Hubs;
using TeeChartJS_SignalR.Models;

namespace TeeChartJS_SignalR.Controllers
{
  public class HomeController : Controller
  {
    private readonly IHubContext<SignalRHub> _hubContext;
    private double nextValue;

    public HomeController(IHubContext<SignalRHub> hubContext)
    {
      _hubContext = hubContext;
    }

    public IActionResult Index()
    {
      nextValue = 500 + new Random().NextDouble() * 500;

      new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(1));

      return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    private void DoWork(object state)
    {
      var data = new MyData
      {
        Value = nextValue
      };

      GettingDataAsync(data);

      nextValue = nextValue + new Random().NextDouble() * 10 - 5;
    }

    private async void GettingDataAsync(MyData data)
    {
      await _hubContext.Clients.All.SendAsync("SendData", data);
    }
  }

  public class MyData
  {
    public double Value { get; set; }
  }
}
