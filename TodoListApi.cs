using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TodoListApi.Data; 
using TodoListApi.Models; 

var builder = WebApplication.CreateBuilder(args);

// Configurar servicios
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TodoContext")));

builder.Services.AddControllers(); // Agregar servicios para controlar los endpoints

var app = builder.Build();

// Configurar middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // P�gina de excepci�n en desarrollo
}
else
{
    app.UseExceptionHandler("/Home/Error"); // P�gina de excepci�n en producci�n
    app.UseHsts(); // Seguridad adicional para HTTP
}

app.UseHttpsRedirection(); // Redirigir HTTP a HTTPS
app.UseStaticFiles(); // Servir archivos est�ticos

app.UseRouting(); // Configurar el enrutamiento
app.UseAuthorization(); // Autorizar las solicitudes

app.MapControllers(); // Mapear controladores

app.Run(); // Ejecutar la aplicaci�n