# Interest Rate Models

## 1. Introduction
Interest rate models describe how future interest rates evolve over time.  
They provide the stochastic process behind rates and are required for:

- Zero-coupon bond pricing  
- Swap pricing  
- Swaption pricing  
- Risk (DV01 / PV01 / IR01)  
- Exposure simulation (EE, EPE, PFE, XVA)

Short-rate models directly model the instantaneous short rate $ r_t $:

$$
dr_t = \text{drift}(t,r_t)\,dt + \text{vol}(t,r_t)\,dW_t
$$

Two components:

- Deterministic drift → long-term tendency / curve calibration  
- Stochastic diffusion → randomness (Brownian motion)

---

## 2. Brownian Motion & Distribution Assumptions

Short-rate models use Brownian motion to introduce randomness into rate evolution.

### 2.1 Brownian Motion Basics

Brownian motion $W_t$ is defined by:

- $W_0 = 0$  
- $W_{t+\Delta t} - W_t \sim N(0, \Delta t)$  
- Independent increments  

Continuous-time notation:

$$
dW_t \sim N(0, dt)
$$

Simulation form:

$$
dW_t \approx \sqrt{\Delta t}\, Z,\quad Z \sim N(0,1)
$$

Meaning:

- Randomness grows with **$\sqrt{\Delta t}$**, not $\Delta t$.  
- Over a horizon $T$,

  $$
  W_T \sim N(0, T) = \sqrt{T} Z
  $$

This explains why many formulas contain $\sqrt{T}$ terms.

---

### 2.2 Normal vs. Lognormal Models

“Normal vs. lognormal” refers to the **distribution of the model variable**, *not* $dW_t$.

#### Normal-Type Model  
Example: Hull–White / Vasicek

$$
dr_t = a(\theta(t) - r_t)\,dt + \sigma\,dW_t
$$

Characteristics:

- Additive noise → $r_t$ is Gaussian.  
- Rates can be negative.  
- Good for curve calibration, XVA, risk.

#### Lognormal-Type Model  
Example: Black / Black–Scholes

$$
dS_t = \mu S_t dt + \sigma S_t dW_t
$$

- Multiplicative noise → $\ln S_T$ normal → $S_T$ lognormal.  
- Ensures positivity.  
- Used when the underlying is a tradable price.

---

### 2.3 What Is the Distribution of $dS_t$?

$dS_t$ itself is not assigned a “distribution name.”  
In discrete form:

$$
\Delta S \approx \mu S_t \Delta t + \sigma S_t \sqrt{\Delta t} Z
$$

The randomness is local; what matters is:

- $S_T$ distribution (lognormal)  
- integrals of $r_t$ (Gaussian)

Models are classified by **terminal distribution**, not by $dW_t$ or $dS_t$.

---

## 3. Itô Formula (Quick Reference)

If

$$
dX_t = \mu(X_t,t)\,dt + \sigma(X_t,t)\,dW_t,
$$

then for a twice-differentiable function $f(x,t)$:

$$
df(X_t,t)
=
f_x\, dX_t
+ f_t\, dt
+ \tfrac12 f_{xx}\, \sigma^2(X_t,t)\, dt.
$$

Example (GBM-type):

$$
dF_t = \sigma F_t dW_t
\;\Rightarrow\;
d(\ln F_t) = \sigma dW_t - \tfrac12 \sigma^2 dt.
$$

---

## 4. Short-Rate Models (Overview)

Short-rate models specify the evolution of $ r_t $.  
Common models:

- Vasicek Model  
- Hull–White One-Factor Model (HW1F)  
- Hull–White Two-Factor Model (HW2F)  
- CIR Model  
- Extended short-rate models (CIR++, G2++, etc.)

---

## 5. Vasicek Model (Comparison Baseline)

The Vasicek model is the simplest mean-reverting short-rate model:

$$
dr_t = a(b - r_t)\,dt + \sigma\,dW_t
$$

Where:

- **a** — mean-reversion speed  
- **b** — long-term mean  
- **σ** — volatility

Key properties:

- Linear SDE → **Gaussian** process  
- Short rate can become negative (normal distribution)  
- Bond price has closed-form **exponential-affine** formula  
- Curve cannot match arbitrary market shapes (smooth, exponential type only)

Why Vasicek matters:

- It is the ancestor of Hull–White: HW simply replaces constant $b$ with a time-dependent $\theta(t)$ to fit today’s curve.  
- Provides intuition for Gaussian affine term-structure models.

Vasicek structure:

$$
r_t = b + (r_0 - b)e^{-at} +
\sigma\int_0^t e^{-a(t-s)} dW_s
$$

Interpretation:

- Deterministic part decays exponentially toward $b$  
- Noise is exponentially damped → OU process  
- Leads to tractable closed-form bond pricing

---

## 6. Hull–White One-Factor Model (HW1F)

### 6.1 Model Definition

$$
dr_t = a(\theta(t) - r_t)\,dt + \sigma\,dW_t
$$

Where:

- $a$: Mean-reversion speed  
- $\theta(t)$: Time-dependent drift (curve-fitting function)  
- $\sigma$: Volatility  
- $W_t$: Brownian motion

Properties:

- Linear SDE → Gaussian process  
- Drift pulls $r_t$ toward $\theta(t)$  
- Noise term contributes uncertainty ~ $\sqrt{dt}$

---

### 6.2 Why Hull–White?

Limitations of Vasicek:

$$
dr_t = a(b - r_t)\,dt + \sigma dW_t
$$

- Uses constant long-term mean $b$  
- Can only produce smooth exponential-type yield curves  
- Cannot fit real market curves (inverted / humped / non-monotonic)

Advantage of Hull–White:

Replace constant $b$ with time-dependent $\theta(t)$:

- $\theta(t)$ is calibrated from market zero-coupon curve  
- Allows perfect fit to today's entire yield curve  
- Ensures model is arbitrage-free relative to market data

---

### 6.3 Calibration: Determining $\theta(t)$

Calibration condition:

$$
P^{HW}(0,T) = P^{mkt}(0,T)
$$

Hull–White bond price:

$$
P(0,T) = A(0,T)\exp(-B(0,T)r_0)
$$

Where:

$$
B(0,T) = \frac{1 - e^{-aT}}{a}
$$

This implies:

$$
A(0,T) = P^{mkt}(0,T)\, e^{B(0,T) r_0}
$$

Using the relationship between $A(0,T)$ and $\theta(t)$, we obtain:

$$
\theta(t)
=
\frac{\partial f(0,t)}{\partial t}
+ a f(0,t)
+ \frac{\sigma^2}{2a}(1 - e^{-2at})
$$

Where $f(0,t)$ is the instantaneous forward curve from market data.

Interpretation:

- $\theta(t)$ ensures the model reproduces today's observed yield curve  
- Future randomness is driven only by $\sigma dW_t$, not by $\theta(t)$

---

### 6.4 Closed-Form Bond Price

Under HW1F:

$$
P(t,T) = A(t,T)\exp(-B(t,T)r_t)
$$

Where:

$$
B(t,T) = \frac{1-e^{-a(T-t)}}{a}
$$

- $B(t,T)$: Sensitivity of bond price to the short rate  
- $A(t,T)$: Adjustment term ensuring curve fit (depends on $\theta(t)$)

Reason bond price is exponential-affine:

- $r_t$ is Gaussian  
- $\int_t^T r_s ds$ is Gaussian  
- Expectation of $\exp(\text{Gaussian})$ has closed form

---

### 6.5 Monte Carlo Simulation

Euler discretization:

$$
r_{t+\Delta t}
=
r_t
+ a(\theta(t)-r_t)\Delta t
+ \sigma\sqrt{\Delta t}\,Z
$$

Where $Z \sim N(0,1)$.

Interpretation:

- Drift term reverts toward $\theta(t)$  
- Diffusion term introduces $\sqrt{dt}$-scale randomness  
- $\theta(t)$ is deterministic and fixed after calibration

---

### 6.6 Economic Interpretation

- **a** → Speed of mean reversion  
- **σ** → Strength of future uncertainty  
- **$\theta(t)$** → Target path needed to match today’s curve  

Meaning:

> Start exactly from today’s market curve,  
> then let rates evolve stochastically with mean reversion.

---

### 6.7 Why Hull–White is Important

Advantages:

- Fits any initial yield curve  
- Closed-form bond prices  
- Closed-form swap & swaption pricing (Jamshidian)  
- Gaussian → easy Monte Carlo  
- Used in:
  - Market risk  
  - XVA  
  - Exposure simulation  
  - Structured rate products

---

### 6.8 Zero-Coupon Bond Options in HW1F

Under HW1F, the zero-coupon bond price has an exponential-affine form:

$$
P(t,T) = A(t,T)\exp\big(-B(t,T) r_t\big),
$$

where:

$$
B(t,T) = \frac{1 - e^{-a(T-t)}}{a}.
$$

Because:

- $r_t$ is Gaussian, and  
- $\ln P(t,T)$ is affine in $r_t$,

it follows that **$\ln P(t,T)$ is Gaussian** and $P(t,T)$ is lognormal (under an appropriate forward measure).

---

#### 6.8.1 Bond Call Option

Consider a European call on a zero-coupon bond:

- Option expiry: $U$  
- Bond maturity: $T > U$  
- Strike: $K$

Payoff at $U$:

$$
\max(P(U,T) - K, 0).
$$

Using **change of numeraire** to the $U$-forward measure $\mathbb{Q}^U$:

$$
C = P(0,U)\;
\mathbb{E}^{\mathbb{Q}^U}\!\left[\max(P(U,T) - K, 0)\right].
$$

Under $\mathbb{Q}^U$, $P(U,T)$ is lognormal with volatility $\sigma_B$.  
Therefore the call price takes a **Black-like closed form**:

$$
C
=
P(0,U) N(d_1)
-
K\, P(0,T)\, N(d_2),
$$

where

$$
d_{1,2}
=
\frac{
\ln\!\left(\dfrac{P(0,T)}{K}\right)
\pm \tfrac12 \sigma_B^2
}{
\sigma_B
},
$$

and the HW1F bond volatility is:

$$
\sigma_B^2
=
\frac{\sigma^2}{2a^3}
\Big(1 - e^{-a(T-U)}\Big)^2
\Big(1 - e^{-2aU}\Big).
$$

Interpretation:

- $P(0,U)$ = discount factor (numeraire)  
- $P(0,T)$ = forward bond price  
- $\sigma_B$ = effective volatility implied by HW1F  
- Formula identical in structure to Black’s forward-call formula

This closed-form bond option is the building block for **swaption pricing via Jamshidian decomposition**.

---

### 6.9 Swaption Pricing via Jamshidian Decomposition (HW1F)

A payer swaption gives the right (at $T_0$) to enter a swap:

- Pay fixed $K$  
- Receive floating  
- Swap payment dates $T_1,\dots,T_n > T_0$

At $T_0$, the swap value is:

$$
V_{\text{swap}}(T_0)
=
1 - P(T_0,T_n)
-
K \sum_{i=1}^n \Delta_i\, P(T_0,T_i).
$$

This is a **linear combination of zero-coupon bond prices**:

$$
V_{\text{swap}}(T_0)
=
1 - \sum_{i=1}^n w_i\, P(T_0,T_i),
$$

with:

$$
w_i =
\begin{cases}
K\Delta_i, & i = 1,\dots,n-1, \\
K\Delta_n + 1, & i = n.
\end{cases}
$$

Thus the payer swaption payoff at $T_0$ is:

$$
\max\Big(1 - \sum_{i=1}^n w_i P(T_0,T_i),\; 0\Big).
$$

This is a **basket option**, normally hard to price analytically.

---

#### 6.9.1 Existence of a Unique $r^*$

Under HW1F:

$$
P(T_0,T_i; r) = A_i \exp(-B_i r),
$$

so each bond price is strictly decreasing in the short rate $r$.  
Therefore:

$$
V_{\text{swap}}(T_0; r)
= 
1 - \sum_{i=1}^n w_i P(T_0,T_i; r)
$$

is a strictly monotone function of $r$.

Hence there exists a **unique** $r^*$ such that:

$$
V_{\text{swap}}(T_0; r^*) = 0,
$$

i.e.,

$$
1 = \sum_{i=1}^n w_i P(T_0,T_i; r^*).
$$

$r^*$ = the **critical short rate** at which the swap is exactly at-the-money at $T_0$.

---

#### 6.9.2 Jamshidian Decomposition

Define:

$$
K_i = P(T_0,T_i;\, r^*).
$$

Jamshidian’s theorem:

> Under any one-factor affine short-rate model (such as HW1F),  
> the payer swaption equals a weighted sum of **bond call options**:

$$
\text{Payer Swaption}
=
\sum_{i=1}^n
w_i\;
C^{\text{bond}}(0;\, U=T_0,\, T_i,\, K_i),
$$

where each term is the closed-form bond call from Section **6.8**.

Thus:

- No Monte Carlo  
- No PDE  
- Swaption is **fully analytic** in HW1F

---

#### 6.9.3 Receiver Swaption

Use swaption put–call parity:

$$
\text{Receiver Swaption}
=
\text{Payer Swaption}
+
\text{PV of fixed leg at strike } K
-
\text{PV of floating leg}.
$$

Or equivalently apply Jamshidian with the opposite swap direction.

---

#### 6.9.4 Intuition & Limitations

- Swap = linear combination of bonds  
- In a **one-factor** affine model, all bonds depend on **one** random variable $r_{T_0}$  
- Swap value becomes **1-D**, strictly monotone → unique $r^*$  
- Basket payoff collapses into sum of single-asset payoffs  

Limitations:

- Works **only** for 1-factor affine models (HW1F, G1++)  
- Fails for multi-factor models (HW2F / G2++), where no unique $r^*$ exists  
- Multi-factor swaption pricing requires PDE / Monte Carlo / approximations  

Jamshidian decomposition is the key reason HW1F provides fast, closed-form swaption pricing.

---

## 7. Hull–White Two-Factor (HW2F)

The one-factor Hull–White model can fit the initial curve but cannot generate realistic yield-curve dynamics.  
Historical yield curves move primarily via:

1. Level  
2. Slope  
3. Curvature  

A single factor cannot capture more than one mode.  
HW2F adds a second Gaussian factor to model richer curve motions.

---

### 7.1 Model Definition

Short rate:

$$
r_t = x_t + y_t + \phi(t)
$$

Factors:

$$
dx_t = -a x_t\,dt + \sigma\, dW_t^{(1)}
$$

$$
dy_t = -b y_t\,dt + \eta\, dW_t^{(2)}
$$

with:

- $\rho = \text{corr}(W^{(1)}, W^{(2)})$  
- $a$: fast mean-reverting speed  
- $b$: slow mean-reverting speed  
- $\phi(t)$: fits today’s OIS curve (same logic as HW1F)

Interpretation:

- $x_t$ → short-end moves  
- $y_t$ → long-end moves  
- Correlation $\rho$ controls how steepeners/flatteners behave

---

### 7.2 Why HW2F?

Limit of HW1F:

> All maturities are perfectly correlated.

HW2F introduces:

- Imperfect correlation  
- Realistic curve deformation  
- Ability to match PCA of yield movements (level + slope)

Thus:

- Much better swaption calibration  
- Better exposure profiles  
- More realistic term-structure dynamics

---

### 7.3 Bond Price Closed Form

Affine structure is preserved:

$$
P(t,T) = \exp\big(A(t,T) - B_1(t,T)x_t - B_2(t,T)y_t\big)
$$

Where:

$$
B_1(t,T) = \frac{1 - e^{-a(T-t)}}{a}, \quad
B_2(t,T) = \frac{1 - e^{-b(T-t)}}{b}
$$

$A(t,T)$ includes convexity corrections and $\phi(t)$.

---

### 7.4 Forward Rate Volatility

Instantaneous forward volatility:

$$
\sigma_f(t,T)
=
\sigma e^{-a(T-t)}
+
\eta e^{-b(T-t)}
$$

Meaning:

- Short maturities load heavily on factor 1  
- Long maturities load on factor 2  
- Term-structure of vol is smooth and realistic  

---

### 7.5 Swaption Pricing

Unlike HW1F, there is **no Jamshidian decomposition**.

Practical pricing methods:

- Analytic approximations (G2++ equivalence)  
- PDE  
- Monte Carlo  

Vendors (Numerix, Murex, Bloomberg) provide fast, calibrated HW2F implementations.

Calibration quality >> HW1F, especially for long expiry/long tenor swaptions.

---

### 7.6 Calibration Strategy

Typical steps:

1. Fit $\phi(t)$ to the OIS curve  
2. Fit $a, b, \sigma, \eta, \rho$ to swaption vol surface  

Rules of thumb:

- $a > b$ : fast vs slow factor  
- $\rho < 0$ matches typical market steepener behavior  
- $\sigma/\eta$ tunes relative short / long end volatility  

---

### 7.7 HW1F vs HW2F Summary

| Feature | HW1F | HW2F |
|--------|------|------|
| Factors | 1 | 2 |
| Curve movements | Level only | Level + slope |
| Correlation across maturities | 100% | Realistic |
| Swaption calibration | Weak | Strong |
| Speed | Very fast | Moderate |
| Simulation | Easy | Still feasible |
| Industry use | Basic risk engines | XVA, structured desks, advanced risk |

HW2F is widely considered the minimal realistic Gaussian short-rate model.

---

## 8. CIR Model (Non-Negative Short Rate)

The CIR model modifies the diffusion term to prevent negative rates:

$$
dr_t = a(b - r_t)\,dt + \sigma\sqrt{r_t}\,dW_t
$$

Key differences vs Vasicek:

| Feature | Vasicek | CIR |
|--------|---------|-----|
| Diffusion | constant σ | σ√r |
| Distribution | Gaussian | non-central χ² |
| Rate negativity | possible | prevented (Feller condition) |
| Curve fitting | cannot | cannot (without shift) |

**Feller condition** ensures strict positivity:

$$
2ab \ge \sigma^2
$$

Interpretation:

- When rates fall toward zero, volatility shrinks  
- Makes it harder to “bounce into negative territory”

Despite being non-Gaussian, CIR still yields exponential-affine bond prices.

Modern usage:

- Credit risk (hazard rates must be ≥0)  
- Emerging-market rate models  
- Sometimes used in shifted form (**CIR++**) to match today’s curve

---

## 9. HJM Framework (General No-Arbitrage Forward-Curve Dynamics)

HJM models the entire instantaneous forward curve $f(t,T)$:

$$
df(t,T) = \alpha(t,T)\, dt + \sigma(t,T)\, dW_t
$$

Where:

- $t$ = current time  
- $T$ = maturity  
- $f(t,T)$ = instantaneous forward rate  
- $\sigma(t,T)$ = forward-rate volatility term structure  

### 9.1 Infinite-Dimensional Nature

For each maturity $T$, forward rate has its own SDE.  
Since maturities are continuous, forward curve is **infinite-dimensional**.

A model for $f(t, T_1)$ tells you nothing about $f(t,T_2)$ unless you specify the whole surface.

---

### 9.2 No-Arbitrage Drift Condition (HJM Core Result)

In the risk-neutral measure (one-factor case):

$$
\alpha(t,T)
=
\sigma(t,T)\int_t^T \sigma(t,u)\,du
$$

Meaning:

- **Volatility fully determines drift**  
- Drift is *not* a free parameter  
- Arbitrage is avoided only if forward curve drift satisfies this condition  

This is the opposite of short-rate models, where we freely choose drift ($\theta(t)$) and discounting ensures no-arbitrage.

---

### 9.3 Why HJM Matters

- Most general arbitrage-free curve model  
- Everything else (HW, G2++, LMM) is essentially **finite-factor or discrete versions of HJM**  
- Used as theoretical foundation, not for direct simulation (too expensive)

---

## 10. Libor Market Model (LMM / BGM)

LMM models **market-observable forward LIBOR rates**:

Forward LIBOR from $T_i$ to $T_{i+1}$:

$$
L_i(t) = L(t, T_i, T_{i+1})
$$

### 10.1 Key Assumption

Under the $T_{i+1}$-forward measure:

$$
dL_i(t)
=
\sigma_i(t)L_i(t) dW_t^{(i)}
$$

- **drift = 0** in its own forward measure → lognormal  
- Perfectly consistent with Black’s formula for caplets  
- Easy calibration to swaption vol surfaces  

This is HJM with:

- discrete maturities  
- lognormal dynamics  
- one measure per forward  

---

### 10.2 Why Drift “Disappears”

Because measure-change absorbs the drift:

- In risk-neutral measure: drift contains HJM-style $\sigma^2$ integrals  
- In forward measure: $L_i(t)$ becomes a martingale → drift = 0  
- The complicated HJM no-arbitrage drift hides inside the Radon–Nikodym derivative  

---

### 10.3 Practical Implications

- **Pricing:** very convenient (caplets, swaptions)  
- **Simulation:** expensive  
  - Must simulate all forwards under a *single* measure  
  - Only one forward has zero drift  
  - Others regain complex drift structures  
- Typically used for derivative pricing, not exposure/XVA simulations  

---

## 11. Multi-Curve Models (OIS Discounting vs LIBOR Forwarding)

Post-2008, the market moved from a **single-curve** world to a **multi-curve** world.

Before 2008:

- One LIBOR curve provided both **discount factors** and **forward rates**

After 2008:

- Discounting must use **OIS curve** (close to risk-free collateral rate)  
- Forward rates use **tenor-specific curves** (1M, 3M, 6M, etc.)  
- Basis spreads between tenors must be modeled explicitly  

### 11.1 Core Structure

- **Discount curve:** OIS  
- **Forward curves:** one per tenor  
- **Basis curve:** difference between forward tenors (e.g., 3M–6M)

Forward rate from tenor $x$:

$$
F^{(x)}(t, T_i, T_{i+1})
=
\frac{1}{\delta_x}
\left(
\frac{P_x(t, T_i)}{P_x(t, T_{i+1})} - 1
\right)
$$

PV under multi-curve:

$$
PV = \sum_i \text{Cashflow}_i \cdot DF_{\text{OIS}}(t_i)
$$

---

### 11.2 Relationship with Models

- **HW**: typically models OIS curve dynamics only  
- **LMM**: models forward LIBOR dynamics; discounting still uses OIS  
- Multi-curve bootstrapping provides deterministic initial curves  

---

### 11.3 Why Multi-Curve Is Essential

- LIBOR ≠ risk-free  
- Collateralized swaps must be discounted at OIS  
- Single-curve pricing yields incorrect swap and swaption values  
- Required for accurate risk (DV01 decomposition, XVA)  

---

## 12. Market Data & Daily Calibration

Interest rate models must align with **today’s market curve**.  
This requires *daily calibration*.

### 12.1 What Counts as Market Data?

Typical market inputs:

#### Curve Instruments
- OIS / SOFR: overnight, futures, OIS swaps  
- IBOR curves: FRAs, futures, IRS  
- Treasury yields  
- Deposit rates  

#### Volatility Data
- Swaption vol surface  
- Cap/Floor vols  
- Futures option vols  

#### Price/Spread Instruments
- Bond prices  
- CDS spreads  

These are updated daily (or intraday) and form the basis of calibration.

---

### 12.2 Why Daily Calibration?

Short-rate models must satisfy:

$$
P^{model}(0,T) = P^{market}(0,T)
$$

Because:

- The market curve changes every day.  
- Risk measures (DV01, IR01, PFE, XVA) depend on **today’s** yield curve.  
- Exposure simulation must begin from the correct initial state.

Process:

1. Bootstrap discount factors from market instruments.  
2. Compute forward rates.  
3. Derive $\theta(t)$ (for HW) or curve-shifting terms (CIR++, G2++).  
4. Optionally calibrate vol parameters (e.g., $\sigma$, $a$) to swaption smile.

Meaning:

> Calibration “anchors” the model to today’s yield curve  
> while the diffusion term ($\sigma dW_t$) generates future randomness.

---

### 12.3 OIS vs Term Rates (Quick Clarification)

Even though OIS is based on overnight rates:

- OIS swaps provide **term structure** via traded fixed rates.  
- Bootstrapping uses these swap prices to infer forward OIS discounting curves.

Thus, OIS curve is fully suitable for forward rate computation.

---

## 13. Volatility Smile (High-Level)

In simple Black models, volatility is constant.  
In real markets, implied volatility varies with:

- strike  
- maturity  

Plotting implied vol vs. strike yields a **smile/skew**.

### 13.1 Smile in Interest Rate Markets

Swaption markets provide a full volatility surface:

- Tenor × Expiry  
- At-the-money, ITM/OTM skews  

Models must fit this surface as best as possible.

#### Approaches:

- Parametric models (SABR)  
- Multi-factor Gaussian models  
- Adjusted short-rate models (local vol / displaced diffusions)  

Smile matters because:

- It encodes market perception of tail risk.  
- It affects pricing of swaptions, callable products, CMS, and XVA exposure.

---

## 14. SABR Volatility Model (Swaption Smile)

The Hull–White model provides closed-form ATM swaption pricing,  
but it cannot fit the **volatility smile** observed in real markets.  
SABR (Stochastic Alpha–Beta–Rho) is the market standard for modeling  
**strike-dependent implied volatility** for swaptions.

SABR is not a short-rate model and does **not** describe interest-rate
evolution. Its purpose is simpler:

> Produce implied volatilities σ(K) across strikes K,  
> matching the swaption smile observed in the market.

---

### 14.1 Model Definition

SABR models the **forward swap rate** $F_t$ under its natural forward measure:

$$
\begin{aligned}
dF_t &= \alpha_t\, F_t^{\,\beta}\, dW_t^{(1)}, \\
d\alpha_t &= \nu\, \alpha_t\, dW_t^{(2)}, \\
\mathrm{corr}(W^{(1)}, W^{(2)}) &= \rho, 
\end{aligned}
$$

where:

- $F_t$ = forward swap rate (or forward rate for caplets)  
- $\alpha_t$ = instantaneous volatility (stochastic)  
- $\alpha_0 = \alpha$ is the calibrated “alpha parameter”  
- $\beta$ = elasticity parameter (controls shape: normal vs lognormal)  
- $\rho$ = correlation between rate & volatility  
- $\nu$ = vol-of-vol (controls smile curvature)  

SABR is a **local-stochastic volatility** model:  
volatility depends simultaneously on the level of the underlying (via $F^\beta$)  
and on a stochastic volatility process ($\alpha_t$).

---

### 14.2 Parameter Interpretation

| Parameter | Meaning | Effect on Smile |
|----------|---------|-----------------|
| **α (alpha)** | Initial vol level | Controls ATM implied vol |
| **β (beta)** | Elasticity exponent | 1 → lognormal shape; 0 → normal shape; intermediate → hybrid |
| **ρ (rho)** | Correlation between F and vol | Controls skew direction and steepness |
| **ν (nu)** | Vol-of-vol | Controls smile curvature / tails (how “fat” ITM/OTM vols become) |

Intuition:

- **β** determines whether volatility grows with the rate level.  
  - β=1 → multiplicative noise → lognormal-type distribution  
  - β=0 → additive noise → normal distribution  
  - 0 < β < 1 → CEV-type dynamics (intermediate behavior)

- **ρ** determines skew.  
  Market swaptions typically have **ρ < 0**, producing the usual downward sloping skew.

- **ν** determines how far ITM/OTM vol deviates from ATM vol.  
  Larger ν → wider smile.

---

### 14.3 Local Volatility Under SABR

The instantaneous variance of $F_t$ is:

$$
\mathrm{Var}(dF_t) = \alpha_t^2 F_t^{2\beta} \, dt.
$$

This “elasticity” $F^{2\beta}$ is the key driver of smile shape:

- If β=1 → high rates produce larger volatility (lognormal behavior)  
- If β=0 → volatility independent of level (normal behavior)  
- Intermediate β → partial level-dependence  

This local-volatility structure explains why Black or Bachelier alone  
cannot fit smile: SABR dynamically adjusts vol according to rate level.

---

### 14.4 Hagan’s Implied Volatility Approximation

SABR itself does **not** provide a closed-form swaption price.  
Instead, Hagan et al. derived an approximation for **Black implied volatility**:

Let:

- $F$ = forward swap rate at pricing time  
- $K$ = strike  
- $T$ = option expiry  
- $\alpha, \beta, \rho, \nu$ = SABR parameters  

Define the logarithmic moneyness:

$$
z = \frac{\nu}{\alpha} (F K)^{\frac{1-\beta}{2}} \ln\left(\frac{F}{K}\right),
$$

and the correction term:

$$
\chi(z)
=
\ln\left(
\frac{
\sqrt{1 - 2\rho z + z^2} + z - \rho
}{
1 - \rho
}
\right).
$$

Then the SABR implied vol under Black’s model is approximately:

$$
\sigma_{\text{SABR}}(K)
\approx
\frac{\alpha}{
(FK)^{\frac{1-\beta}{2}}
}
\left[
1 +
\frac{(1-\beta)^2}{24} \ln^2\!\left(\frac{F}{K}\right)
+
\frac{(1-\beta)^4}{1920} \ln^4\!\left(\frac{F}{K}\right)
\right]
\cdot
\frac{z}{\chi(z)}.
$$

This expression produces a full strike-dependent volatility curve  
that matches market swaption smiles remarkably well.

---

### 14.5 ATM Implied Volatility

At ATM ( $K = F$ ), the formula simplifies significantly:

$$
\sigma_{\text{ATM}}
\approx
\alpha
\left[
1 +
\frac{(1-\beta)^2}{24} \alpha^2 T F^{2\beta-2}
+
\frac{\rho \beta \nu \alpha T}{4}
+
\frac{\nu^2 T}{24}
\right].
$$

Interpretation:

- $\alpha$ is the **dominant** term (ATM determines α)  
- β adjusts how ATM vol changes with rate level  
- ρ introduces skew effects even at ATM  
- ν adjusts curvature  

---

### 14.6 Calibration Workflow

Market calibration typically proceeds as:

1. **Fix β**  
   - Often 0.5, 0.7, or 1.0  
   - Chosen to give stable parameter behavior  

2. **Fit α (ATM vol)**  
   - Match SABR ATM formula to market ATM vol  

3. **Fit ρ and ν**  
   - Match slope and curvature of the market smile  
   - ρ controls skew  
   - ν controls fat tails / wings  

This yields a set of SABR parameters for each expiry–tenor pair of the swaption surface  
(e.g., 1Y×10Y, 2Y×5Y, 5Y×30Y).

---

### 14.7 SABR vs. Short-Rate Models

| Feature | Hull–White (HW1F) | SABR |
|---------|--------------------|------|
| Purpose | Rate evolution, curve dynamics | Smile fitting, option vols |
| Distribution | Normal-type | CEV + stochastic vol |
| ATM swaptions | Closed-form (Jamshidian) | Fits ATM via α |
| Smile | Poor | Excellent |
| Full surface | Weak | Strong (market standard) |
| Used for | Risk, exposure, curve models | Pricing, calibration |

SABR complements models like HW1F or HW2F:

- Use HW for curve evolution / scenario generation  
- Use SABR for market-consistent smile calibration  

---

### 14.8 Practical Notes

- SABR is **parametric**, not a term-structure model.  
- Parameters vary by expiry and tenor.  
- β is typically fixed to reduce instability.  
- Real desks use **SABR → implied vol → Black/Bachelier price**.  
- Hagan approximation is extremely accurate except for extreme wings and very low rates.  

SABR remains the dominant market standard for swaption smile calibration.

---

## 15. Summary

Key intuitions:

- Brownian increments scale as $\sqrt{dt}$; randomness increases as $\sqrt{T}$.  
- “Normal/lognormal” refers to the distribution of the *model variable*, not $dW_t$.  
- Daily calibration aligns the model to today’s yield curve.  
- Short-rate models (Vasicek, HW1F/HW2F, CIR) give affine term structures.  
- HJM provides a general no-arbitrage framework; LMM is its tradable, discrete version.  
- Multi-curve is mandatory post-2008 (OIS discounting vs tenor forwarding).  
- Smile/surface is the “fingerprint” of market option prices; models must map to it.
